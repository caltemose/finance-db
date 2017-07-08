import React, { Component } from 'react'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'
import { fetchTransactionsByDate, editTransaction } from '../actions/actions'
import TransactionsList from '../components/transactions/TransactionsList'

class Transactions extends Component {

    constructor (props) {
        super(props)
        this.onTransactionSave = this.onTransactionSave.bind(this)
    }

    /*
    TODO update code to prevent/delay request for transactions until categories are known
    In this case, check to see if App initialization is complete (via Redux store prop),
    or if categories exist in the Redux store. If not, do not fetch transactions.
    In that case, use componentWillReceiveProps() and request transactions if
    the props array of transactions is empty.
    */
    componentDidMount () {
        const { startMonth, startYear, endMonth, endYear } = this.props.params
        this.props.fetchTransactionsByDate(startMonth, startYear, endMonth, endYear)
    }

    onTransactionSave (id, payee, items) {
        this.props.editTransaction(id, payee, items)
    }

    render () {
        return (
            <DocumentTitle title="Finances: Transactions">
                <TransactionsList 
                    payees={this.props.payees}
                    categories={this.props.categories} 
                    transactions={this.props.transactions} 
                    editTransaction={this.onTransactionSave} 
                />
            </DocumentTitle>
        )
    }
}

const mapStateToProps = (state) => ({
    transactions: state.transactions,
    categories: state.categories,
    payees: state.payees
})

const mapDispatchToProps = ({
    fetchTransactionsByDate,
    editTransaction
})

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)
