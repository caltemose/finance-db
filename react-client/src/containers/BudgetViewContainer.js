import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { fetchBudgetInRange, fetchTransactionsByDate } from '../actions/actions'
import BudgetView from '../components/budgets/BudgetView'

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
        // create array of months in the given range
        const { startMonth, startYear, endMonth, endYear } = this.props.params
        let months = []

        const firstMonth = moment(startYear + '/' + startMonth, 'YYYY-MM')
        months.push(firstMonth)

        const lastMonth = moment(endYear + '/' + endMonth, 'YYYY-MM')

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
            const thisMonth = byMonth[month.format('YYYY-MM')] = {}
            thisMonth.categories = {}
            budgetCategoryIds.forEach(categoryId => {
                thisMonth.categories[categoryId] = {
                    categoryName: this.props.categories.byId[categoryId].category,
                    budgetLimit: this.props.selectedBudget.categories[categoryId],
                    totalSpent: 0
                }
            })
        })

        let ignoredTransactions = []

        // loop through all transactions in the given range
        this.props.transactions.allIds.forEach(id => {
            const transaction = this.props.transactions.byId[id]
            const categoryObject = categoriesByName[transaction.category]

            if (categoryObject) {
                const transactionDate = moment(transaction.date)
                const transactionCategoryId = categoryObject._id

                if (budgetCategoryIds.includes(transactionCategoryId)) {
                    // handle transactions with categories that are in the budget
                    const transactionDateFormatted = transactionDate.format('YYYY-MM')
                    byMonth[transactionDateFormatted].categories[transactionCategoryId].totalSpent += transaction.amount

                } else {
                    // ignore transactions with categories that are not in the budget
                    ignoredTransactions.push(transaction)
                }

            } else {
                ignoredTransactions.push(transaction)
            }
        })

        console.log(byMonth)
        this.setState({ reports: byMonth })
    }

    render () {
        if (!this.state.budgetLoading && !this.state.transactionsLoading) {
            return <BudgetView reports={this.state.reports} />
        } else {
            return <div><p>Loading/Processing...</p></div>
        }
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

/*

Plan:

/api/budgets/from/:startMonth/:startYear
API: Get Budget by Start Date

/api/transactions/from/:startMonth/:startYear/to/:endMonth/:endYear
API: Get all transactions within given range

Create budget report data per month in range:

Month:
    date: Date,
    categories:
        id: String
        name: String
        budgetLimit: Number
        totalSpent: Number
        difference: Number
    totalSpent:
    totalLimit:
    totalIncome:

Display per-month report.

*/
