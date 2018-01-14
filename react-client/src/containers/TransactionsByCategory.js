import React, { Component } from 'react'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'
import { fetchTransactionsByCategory, editTransaction } from '../actions/actions'
import TransactionsList from '../components/transactions/TransactionsList'

class TransactionsByCategory extends Component {

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
        const { category } = this.props.params
        this.props.fetchTransactionsByCategory(category)
    }

    onTransactionSave (id, payee, items) {
        this.props.editTransaction(id, payee, items)
    }

    render () {
        return (
            <DocumentTitle title="Finances: Transactions By Category">
                <div>
                    <h2>Category: {this.props.params.category}</h2>
                    <TransactionsList
                        payees={this.props.payees}
                        categories={this.props.categories}
                        transactions={this.props.transactions}
                        editTransaction={this.onTransactionSave}
                    />
                </div>
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
    fetchTransactionsByCategory,
    editTransaction
})

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsByCategory)
