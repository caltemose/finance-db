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
        const combined = !!this.props.location.query.combine

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

        const budgetMultiplier = combined ? months.length : 1

        // create index of categories by name to facilitate quick lookups
        const categoriesByName = {}
        this.props.categories.allIds.forEach(id => {
            const category = this.props.categories.byId[id]
            categoriesByName[category.category] = category
        })

        const budgetCategoryIds = Object.keys(this.props.selectedBudget.categories)
        // create an object with keys for each month in the report
        let byMonth = {}
        // populate the byMonth object
        if (combined) {
            // if combined, populate everything into one "month"
            this.populatePeriod(byMonth, firstMonth, budgetCategoryIds, budgetMultiplier)
        } else {
            // if not combined, populate data separately for each month
            months.forEach(month => {
                this.populatePeriod(byMonth, month, budgetCategoryIds, 1)
            })
        }

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

        this.props.transactions.allIds.forEach(id => {
            const transaction = this.props.transactions.byId[id]
            const transactionDate = moment(transaction.date)
            const transactionDateFormatted = transactionDate.format(FORMAT_YEAR_MONTH)
            let period = combined ? byMonth[firstMonth.format(FORMAT_YEAR_MONTH)] : byMonth[transactionDateFormatted]

            transaction.items.forEach((transItem, index) => {
                let item = { ...transItem }
                item._id = transaction._id + '-' + index
                item.payee = transaction.payee
                const categoryObject = categoriesByName[item.category]

                // update the total income or expense amount for this month
                if (!exemptFromTotalIncomeAndExpenses.includes(item.category)) {
                    if (item.amount > 0) {
                        period.totalIncome += item.amount
                    } else {
                        period.totalExpenses += Math.abs(item.amount)
                    }
                }

                if (categoryObject) {
                    const itemCategoryId = categoryObject._id
                    // only manipulate the budget report if this transaction
                    // has a category tracked by the budget
                    if (budgetCategoryIds.includes(itemCategoryId)) {
                        // handle transactions with categories that are in the budget
                        period.categories[itemCategoryId].totalSpent += item.amount
                        period.totalBudgetSpent += item.amount
                    } else {
                        //
                        if (!notInBudgetExcludedCategories.includes(item.category)) {
                            // track ignored transactions with categories that are not in the budget
                            period.transactionsNotInBudget.items.push(item)
                            period.transactionsNotInBudget.totalSpent += item.amount
                        }
                    }

                } else {
                    // track transactions with unrecognized categories
                    period.transactionsUnknownCategories.items.push(item)
                    period.transactionsUnknownCategories.totalSpent += item.amount
                }
            })
        })

        this.setState({ reports: byMonth })
    }

    populatePeriod (byMonth, month, budgetCategoryIds, budgetMultiplier) {
        const period = byMonth[month.format(FORMAT_YEAR_MONTH)] = {}
        period.month = month.format('MMMM')
        period.year = month.format('YYYY')
        period.totalIncome = 0
        period.totalExpenses = 0
        period.totalBudgetLimit = 0
        period.totalBudgetSpent = 0

        period.categories = {}
        budgetCategoryIds.forEach(categoryId => {
            period.categories[categoryId] = {
                categoryName: this.props.categories.byId[categoryId].category,
                budgetLimit: budgetMultiplier * this.props.selectedBudget.categories[categoryId],
                totalSpent: 0
            }
            period.totalBudgetLimit += Number(this.props.selectedBudget.categories[categoryId]) * budgetMultiplier
            period.transactionsNotInBudget = { items: [], totalSpent: 0 }
            period.transactionsUnknownCategories = { items: [], totalSpent: 0 }
        })
    }

    render () {
        let html
        if (!this.state.budgetLoading && !this.state.transactionsLoading) {
             html = (<BudgetView reports={this.state.reports} />)
        } else {
            html = (<div><p>Loading/Processing...</p></div>)
        }
        return (
            <DocumentTitle title="Finances: View Budget">
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
