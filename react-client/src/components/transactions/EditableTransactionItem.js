import React, { Component, PropTypes } from 'react'
// import { prettyAmount } from '../../helpers'

class EditableTransactionItem extends Component {
    static propTypes = {
        index: PropTypes.number.isRequired,
        amount: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        addTransactionItem: PropTypes.func.isRequired
    }

    handleAmountChange = (event) => {
        this.props.handleItemChange(this.props.index, 'amount', Number(event.target.value))
    }

    handleDescriptionChange = (event) => {
        this.props.handleItemChange(this.props.index, 'description', event.target.value)
    }

    handleCategoryChange = (event) => {
        this.props.handleItemChange(this.props.index, 'category', event.target.value)
    }

    handleDeleteItem = (event, index) => {
        event.preventDefault()
        this.props.deleteTransactionItem(index)
    }

    render () {
        const { index, amount, description, category, addTransactionItem } = this.props
        let deleteBtn = ''
        if (index > 0) {
            deleteBtn = <button onClick={(event) => { this.handleDeleteItem(event, index) }}>-</button>
        }

        return (
            <fieldset className="transaction-item" key={index}>
                <input className="transaction-item-amount" type="number" defaultValue={amount} onChange={ this.handleAmountChange } placeholder="amount" />

                <input className="transaction-item-description" type="text" defaultValue={description} onChange={ this.handleDescriptionChange } placeholder="description" />

                <input className="transaction-item-category" type="text" defaultValue={category} onChange={ this.handleCategoryChange } placeholder="category" />

                <button onClick={addTransactionItem}>+</button>
                {deleteBtn}
            </fieldset>
        )
    }
}

export default EditableTransactionItem
