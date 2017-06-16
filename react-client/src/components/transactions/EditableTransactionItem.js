import React, { Component, PropTypes } from 'react'
import { prettyAmount } from '../../helpers'

class EditableTransactionItem extends Component {

    // constructor (props) {
    //     super(props)
    // }

    handleAmountChange = (event) => {
        this.props.handleItemChange(this.props.index, 'amount', Number(event.target.value))
    }

    handleDescriptionChange = (event) => {
        this.props.handleItemChange(this.props.index, 'description', event.target.value)
    }

    handleCategoryChange = (event) => {
        this.props.handleItemChange(this.props.index, 'category', event.target.value)
    }

    render () {
        const { index, amount, description, category, addTransactionItem } = this.props

        return (
            <fieldset className="transaction-item" key={index}>
                <input className="transaction-item-amount" type="number" defaultValue={amount} onChange={ this.handleAmountChange } placeholder="amount" />
                    
                <input className="transaction-item-description" type="text" defaultValue={description} onChange={ this.handleDescriptionChange } placeholder="description" />
                
                <input className="transaction-item-category" type="text" defaultValue={category} onChange={ this.handleCategoryChange } placeholder="category" />

                <button onClick={addTransactionItem}>+</button>
                {/*<button onClick={this.props.deleteTransactionItem}>-</button>*/}
            </fieldset>
        )
    }
}

export default EditableTransactionItem
