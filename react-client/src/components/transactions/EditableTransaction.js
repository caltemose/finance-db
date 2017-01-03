import React, { Component, PropTypes } from 'react'
import moment from 'moment'

const prettyDate = dateStamp => (
    moment(dateStamp).format('YYYY/MM/DD')
)

const prettyAmount = amount => (
    Number(amount).toFixed(2)
)

class EditableTransaction extends Component {
    static propTypes = {
        transaction: PropTypes.object.isRequired,
        editTransaction: PropTypes.func.isRequired
    }

    constructor (props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit (event) {
        event.preventDefault()
        const id = this.props.transaction._id
        const payee = this.payeeInput.value
        const category = this.categoryInput.value
        console.log(id, payee, category)
        this.props.editTransaction(id, payee, category)
    }

    render () {
        const transaction = this.props.transaction
        let classes = transaction.amount > 0 ? 'transaction deposit' : 'transaction'
        classes += transaction.inBudget ? ' in-budget' : ''

        return (
            <li key={transaction._id} className={classes}>
                <form className="editable-transaction-form" onSubmit={this.handleSubmit}>
                    <span className="transaction-date">{prettyDate(transaction.date)}</span>
                    <span className="transaction-amount">{prettyAmount(transaction.amount)}</span>

                    <input className="transaction-payee" type="text" name="payee" defaultValue={transaction.payee} ref={(input) => this.payeeInput = input} />
                    <input className="transaction-category" type="text" name="payee" defaultValue={transaction.category} ref={(input) => this.categoryInput = input} />

                    <span className="transaction-account">{transaction.account}</span>

                    <button type="submit" name="submit">Save</button>
                </form>
            </li>
        )
    }
}

export default EditableTransaction
