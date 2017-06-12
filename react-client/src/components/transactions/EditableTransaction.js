import React, { Component, PropTypes } from 'react'
import { prettyAmount, prettyDate } from '../../helpers'
import PubSub from 'pubsub-js'

class EditableTransaction extends Component {
    static propTypes = {
        transaction: PropTypes.object.isRequired,
        editTransaction: PropTypes.func.isRequired,
        categories: PropTypes.object.isRequired
    }

    constructor (props) {
        super(props)
        this.state = { statusClass: null }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.transactionSaved = this.transactionSaved.bind(this)
        this.clearStatusClass = this.clearStatusClass.bind(this)
    }

    subscribeToSave () {
        this.pubToken = PubSub.subscribe('transaction-saved', this.transactionSaved)
    }

    unsubscribeFromSave () {
        PubSub.unsubscribe(this.pubToken)
    }

    transactionSaved (event, id) {
        if (this.props.transaction._id === id) {
            this.setState({ statusClass: "is-saved" })
            this.unsubscribeFromSave()
            setTimeout(this.clearStatusClass, 2000)
        }
    }

    clearStatusClass () {
        this.setState({ statusClass: null })
    }

    handleSubmit (event) {
        event.preventDefault()
        this.subscribeToSave()
        const id = this.props.transaction._id
        const payee = this.payeeInput.value
        const category = this.categoryInput.value
        this.props.editTransaction(id, payee, category)
    }

    getDefaultCategoryValue (categoryName, categories) {
        let name = 'uncategorized'
        categories.allIds.forEach(id => {
            if (categories.byId[id].category === categoryName)
                name = categoryName
        })
        return name
    }

    render () {
        const { transaction, categories } = this.props
        const defaultCategoryValue = this.getDefaultCategoryValue(transaction.category, categories)
        let classes = transaction.amount > 0 ? 'transaction deposit' : 'transaction'
        classes += transaction.inBudget ? ' in-budget' : ''
        classes += this.state.statusClass ? ' ' + this.state.statusClass : ''
        // classes += defaultCategoryValue === 'uncategorized' ? ' uncategorized' : ''

        return (
            <li key={transaction._id} className={classes}>
                <form className="editable-transaction-form" onSubmit={this.handleSubmit}>
                    <span className="transaction-date">{prettyDate(transaction.date)}</span>
                    <span className="transaction-amount">{prettyAmount(transaction.amount)}</span>

                    <input className="transaction-payee" type="text" name="payee" defaultValue={transaction.payee} ref={(input) => this.payeeInput = input} />
                    {/*
                    <div className="transaction-category-container">
                        <select
                            className="transaction-category"
                            name="payee"
                            defaultValue={defaultCategoryValue}
                            ref={input => this.categoryInput = input}>
                            {categories.allIds.map(id => {
                                const categoryName = categories.byId[id].category
                                return (
                                    <option key={id} value={categoryName}>{categoryName}</option>
                                )
                            })}
                        </select>
                        <span className="transaction-category-original">
                            {transaction.category}
                        </span>
                    </div>
                    */}
                    <span className="transaction-account">{transaction.account}</span>

                    <button type="submit" name="submit">Save</button>

                    {transaction.items.map((item, index) => {
                        return (
                            <fieldset key={transaction._id + '-' + index}>
                                {item.amount}
                                ::  
                                {item.description}
                                ::
                                {item.category}
                            </fieldset>
                        )
                    })}
                </form>
            </li>
        )
    }
}

export default EditableTransaction
