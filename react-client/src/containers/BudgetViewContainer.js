import React, { Component } from 'react'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'
import moment from 'moment'

import { fetchBudgetInRange, fetchTransactionsByDate } from '../actions/actions'
import BudgetView from '../components/budgets/BudgetView'

const FORMAT_YEAR_MONTH = 'YYYY-MM'

class BudgetViewContainer extends Component {
    constructor (props) {
        super(props)
        this.state = {
            reports: [],
            budgetLoading: true,
            transactionsLoading: false
        }
    }

    componentDidMount () {
        const { startMonth, startYear } = this.props.params
        this.props.fetchBudgetInRange(startMonth, startYear)
    }

    componentWillReceiveProps (nextProps) {
        if (this.state.budgetLoading && !this.state.transactionsLoading && nextProps.selectedBudget) {
            this.setState({ budgetLoading: false, transactionsLoading: true })
            const { startMonth, startYear, endMonth, endYear } = this.props.params
            this.props.fetchTransactionsByDate(startMonth, startYear, endMonth, endYear)
            return
        }

        if (!this.state.budgetLoading && this.state.transactionsLoading && !nextProps.transactions.isFetching) {
            this.setState({ transactionsLoading: false })
            setTimeout(() => {
                this.processData()
            }, 100)
        }
    }

    processData () {
        const { startMonth, startYear, endMonth, endYear } = this.props.params

        // create array of months in the given range
        let months = []
        const firstMonth = moment(startYear + '/' + startMonth, FORMAT_YEAR_MONTH)
        months.push(firstMonth)

        const lastMonth = moment(endYear + '/' + endMonth, FORMAT_YEAR_MONTH)
        // add months until we've reached the final month
        if (lastMonth.isAfter(firstMonth)) {
            const diff = lastMonth.diff(firstMonth, 'M')
            let month = moment(firstMonth)
            for(let i=0; i<diff; i++) {
                month.add(1, 'M')
                months.push(moment(month))
            }
        }

        // create index of categories by name to facilitate quick lookups
        const categoriesByName = {}
        this.props.categories.allIds.forEach(id => {
            const category = this.props.categories.byId[id]
            categoriesByName[category.category] = category
        })

        const budgetCategoryIds = Object.keys(this.props.selectedBudget.categories)
        // create an object with keys for each month in the report
        let byMonth = {}
        months.forEach(month => {
            const thisMonth = byMonth[month.format(FORMAT_YEAR_MONTH)] = {}
            thisMonth.month = month.format('MMMM')
            thisMonth.year = month.format('YYYY')
            // all income noted by >0 transactions
            thisMonth.totalIncome = 0
            // all expenses including non-budget and non-categorized
            // noted by <0 transactions
            thisMonth.totalExpenses = 0
            thisMonth.totalBudgetLimit = 0
            thisMonth.totalBudgetSpent = 0

            // add the default category objects for each category in the budget
            thisMonth.categories = {}
            budgetCategoryIds.forEach(categoryId => {
                thisMonth.categories[categoryId] = {
                    categoryName: this.props.categories.byId[categoryId].category,
                    budgetLimit: this.props.selectedBudget.categories[categoryId],
                    totalSpent: 0
                }
                thisMonth.totalBudgetLimit += Number(this.props.selectedBudget.categories[categoryId])
                thisMonth.transactionsNotInBudget = { items: [], totalSpent: 0 }
                thisMonth.transactionsUnknownCategories = { items: [], totalSpent: 0 }
            })
        })

        const notInBudgetExcludedCategories = [
            'credit card payments',
            'work expense',
            'work reimbursement',
            'work income-salary',
            'interest-earned',
            'atm fee rebate'
        ]

        const exemptFromTotalIncomeAndExpenses = [
            'credit card payments',
            'work expense',
            'work reimbursement'
        ]

        // loop through all transactions in the given range
        this.props.transactions.allIds.forEach(id => {
            const transaction = this.props.transactions.byId[id]
            const categoryObject = categoriesByName[transaction.category]
            const transactionDate = moment(transaction.date)
            const transactionDateFormatted = transactionDate.format(FORMAT_YEAR_MONTH)

            // update the total income or expense amount for this month
            if (!exemptFromTotalIncomeAndExpenses.includes(transaction.category)) {
                if (transaction.amount > 0) {
                    byMonth[transactionDateFormatted].totalIncome += transaction.amount
                } else {
                    byMonth[transactionDateFormatted].totalExpenses += Math.abs(transaction.amount)
                }
            }

            // if no categoryObject, this transaction has an unrecognized category
            if (categoryObject) {
                const transactionCategoryId = categoryObject._id
                // only manipulate the budget report if this transaction
                // has a category tracked by the budget
                if (budgetCategoryIds.includes(transactionCategoryId)) {
                    // handle transactions with categories that are in the budget
                    byMonth[transactionDateFormatted].categories[transactionCategoryId].totalSpent += transaction.amount
                    byMonth[transactionDateFormatted].totalBudgetSpent += transaction.amount
                } else {
                    //
                    if (!notInBudgetExcludedCategories.includes(transaction.category)) {
                        // track ignored transactions with categories that are not in the budget
                        byMonth[transactionDateFormatted].transactionsNotInBudget.items.push(transaction)
                        byMonth[transactionDateFormatted].transactionsNotInBudget.totalSpent += transaction.amount
                    }
                }

            } else {
                // track transactions with unrecognized categories
                byMonth[transactionDateFormatted].transactionsUnknownCategories.items.push(transaction)
                byMonth[transactionDateFormatted].transactionsUnknownCategories.totalSpent += transaction.amount
            }
        })

        this.setState({ reports: byMonth })
    }

    render () {
        let html
        if (!this.state.budgetLoading && !this.state.transactionsLoading) {
             html = (<BudgetView reports={this.state.reports} />)
        } else {
            html = (<div><p>Loading/Processing...</p></div>)
        }
        return (
            <DocumentTitle title="FDB: View Budget">
                {html}
            </DocumentTitle>
        )
    }
}

const mapStateToProps = (state) => ({
    categories: state.categories,
    selectedBudget: state.budgets.selected,
    transactions: state.transactions
})

const mapDispatchToProps = ({
    fetchBudgetInRange,
    fetchTransactionsByDate
})

export default connect(mapStateToProps, mapDispatchToProps)(BudgetViewContainer)
