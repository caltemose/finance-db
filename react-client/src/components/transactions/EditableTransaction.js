import React, { Component, PropTypes } from 'react'
import { prettyAmount, prettyDate } from '../../helpers'
import PubSub from 'pubsub-js'
import EditableTransactionItem from './EditableTransactionItem'

class EditableTransaction extends Component {
    static propTypes = {
        transaction: PropTypes.object.isRequired,
        editTransaction: PropTypes.func.isRequired,
        categories: PropTypes.object.isRequired
    }

    constructor (props) {
        super(props)
        this.state = {
            statusClass: null,
            items: []
        }

        this.transactionSaved = this.transactionSaved.bind(this)
        this.clearStatusClass = this.clearStatusClass.bind(this)
    }

    componentWillMount () {
        this.setState({
            items: [ ...this.props.transaction.items ]
        })
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

    handleSubmit = (event) => {
        event.preventDefault()
        this.subscribeToSave()

        const id = this.props.transaction._id
        const payee = this.payeeInput.value

        // do line item amounts equal the total?
        const total = this.props.transaction.amount

        let itemsTotal = this.state.items.reduce((prev, curr) => {
            const prevVal = typeof(prev) === 'number' ? prev : prev.amount
            return prevVal + curr.amount
        }, 0)

        itemsTotal = Math.round(itemsTotal*100)/100;

        if (total !== itemsTotal) {
            console.error('total', total, 'itemsTotal', itemsTotal)
            alert('line items for this transaction must add up to the total amount')
        } else {
            // console.log('saving transaction:')
            // console.log(id, payee)
            // console.log(this.state.items)
            this.props.editTransaction(id, payee, this.state.items)
        }
    }

    getDefaultCategoryValue (categoryName, categories) {
        let name = 'uncategorized'
        categories.allIds.forEach(id => {
            if (categories.byId[id].category === categoryName)
                name = categoryName
        })
        return name
    }

    handleItemChange = (index, field, value) => {
        let items = [ ...this.state.items ]
        items[index][field] = value
        this.setState({ items })
    }

    addTransactionItem = (event) => {
        event.preventDefault()
        const item = {
            amount: 0,
            description: '',
            category: ''
        }
        this.setState({
            items: [
                ...this.state.items,
                item
            ]
        })
    }

    deleteTransactionItem = (index) => {
        let items = [...this.state.items]
        items.splice(index, 1)
        this.setState({ items })
    }

    render () {
        const { transaction, categories } = this.props
        // const { transaction, categories } = this.props
        // const defaultCategoryValue = this.getDefaultCategoryValue(transaction.category, categories)
        let classes = transaction.amount > 0 ? 'transaction deposit' : 'transaction'
        classes += transaction.inBudget ? ' in-budget' : ''
        classes += this.state.statusClass ? ' ' + this.state.statusClass : ''
        // TODO update implementation of uncategorized class for transaction.items instead of transactions
        // classes += defaultCategoryValue === 'uncategorized' ? ' uncategorized' : ''

        return (
            <li key={transaction._id} className={classes}>
                <form className="editable-transaction-form" onSubmit={this.handleSubmit}>
                    <span className="transaction-date">{prettyDate(transaction.date)}</span>
                    <span className="transaction-amount">{prettyAmount(transaction.amount)}</span>

                    <input className="transaction-payee" type="text" name="payee" defaultValue={transaction.payee} ref={(input) => this.payeeInput = input} />

                    <span className="transaction-account">{transaction.account}</span>

                    {this.state.items.map((item, index) => {
                        const editableItem = <EditableTransactionItem
                            key={transaction._id + '-' + index}
                            index={index}
                            amount={item.amount}
                            description={item.description}
                            category={item.category}
                            categories={categories}
                            handleItemChange={this.handleItemChange}
                            addTransactionItem={this.addTransactionItem}
                            deleteTransactionItem={this.deleteTransactionItem}
                        />
                        return editableItem
                    })}
                    <button type="submit" name="submit">Save</button>
                </form>
            </li>
        )
    }

}

export default EditableTransaction
