import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchTransactionsByDate } from '../actions/actions'
import TransactionsList from '../components/transactions/TransactionsList'

class Transactions extends Component {

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

    // TransactionsList is going to need:
    // transactions
    // actionCreator function to call to update a transaction
    render () {
        return (
            <TransactionsList transactions={this.props.transactions} />
        )
    }
}

const mapStateToProps = (state) => ({
    transactions: state.transactions
})

const mapDispatchToProps = ({
    fetchTransactionsByDate
})

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)
