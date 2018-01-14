import React, { Component } from 'react'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'
import { editTransaction } from '../actions/actions'
import { getTransactionById } from '../reducers/transaction-reducers'
import EditableTransaction from '../components/transactions/EditableTransaction'

class Transaction extends Component {

    constructor (props) {
        super(props)
        this.onTransactionSave = this.onTransactionSave.bind(this)
    }

    componentDidMount () {
        // const { id } = this.props.params
    }

    onTransactionSave (id, payee, items) {
        this.props.editTransaction(id, payee, items)
    }

    render () {
        const initialized = this.props.transaction._id
        if (initialized) {
            const { transaction, categories } = this.props
            return (
                <DocumentTitle title="Finances: Transaction">
                    <div>
                        <EditableTransaction key={transaction._id} transaction={transaction} editTransaction={this.onTransactionSave} categories={categories} />
                    </div>
                </DocumentTitle>
            )
        } else {
            return <div><h2>Loading transaction...</h2></div>
        }
    }
}

const mapStateToProps = (state, ownProps) => ({
    transaction: getTransactionById(state, ownProps.params.id),
    categories: state.categories,
    payees: state.payees
})

const mapDispatchToProps = ({
    editTransaction
})

export default connect(mapStateToProps, mapDispatchToProps)(Transaction)
