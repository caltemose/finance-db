import Ajax from './modules/ajax'
const ajax = new Ajax()

class Transaction {
    constructor (transaction) {
        this.data = transaction
        this.init()
        this.activate = this.activate.bind(this)
        this.saveTransaction = this.saveTransaction.bind(this)
    }

    init () {
        const transaction = this.data
        this.fields = {}
        let formClasses = transaction.amount < 0 ?
            'transaction-form negative' : 'transaction-form positive'
        let form = this.form = document.createElement('form')
        form.name = transaction._id
        form.className = formClasses
        form.method = 'post'
        // hidden id
        // form.appendChild( this.createInputElement('hidden', '_id', '', transaction._id) )
        // date
        form.appendChild( this.createInputElement('text', 'date', 'transaction-date', this.prettyDate(transaction.date), true, true) )
        // amount
        form.appendChild( this.createInputElement('text', 'amount', 'transaction-amount', transaction.amount, true, true) )
        // category
        this.fields.category = this.createInputElement('text', 'category', 'transaction-category', transaction.category)
        form.appendChild(this.fields.category)
        // payee
        this.fields.payee = this.createInputElement('text', 'payee', 'transaction-payee', transaction.payee)
        form.appendChild(this.fields.payee)
        // account
        form.appendChild( this.createInputElement('text', 'account', 'transaction-account', transaction.account, true, true) )
        // submit
        let btn = document.createElement('button')
        btn.name = 'submit'
        btn.appendChild(document.createTextNode('Save'))
        this.submitButton = btn
        form.appendChild(btn)
    }

    createInputElement (type, name, className, value, disabled = false, readOnly = false) {
        let input = document.createElement('input')
        input.type = type
        input.name = name
        input.className = className
        input.value = value
        if (disabled) input.disabled = true
        if (readOnly) input.readOnly = true
        return input
    }

    getElement () {
        return this.form
    }

    prettyDate (timestamp) {
        let date = new Date(timestamp)
        return (date.getMonth()+1) + '/' + date.getDate() + '/' +  date.getFullYear()
    }

    activate () {
        // console.log('Transaction.activate()', this.data._id)
        this.submitButton.addEventListener('click', this.saveTransaction)
    }

    saveTransaction (event) {
        event.preventDefault()
        console.log('saveTransaction')
        console.log('data._id:', this.data._id)
        console.log('payee:', this.fields.payee.value)
        console.log('category:', this.fields.category.value)
        let data = {
            payee: this.fields.payee.value,
            category: this.fields.category.value
        }
        ajax.put(`http://localhost:3333/api/transaction/${this.data._id}/simple-edit`, data).then((data) => {
            console.log(data)
        })
    }
}

class ViewAll {
    constructor (container) {
        this.container = container
        this.loadTransactions()
    }

    loadTransactions () {
        const displayTransactions = this.displayTransactions.bind(this)
        ajax.getJSON('http://localhost:3333/api/transactions').then((data) => {
            displayTransactions(data)
        })
    }

    displayTransactions (transactions) {
        this.transactions = []
        transactions.map((transaction) => {
            let trans = new Transaction(transaction)
            this.transactions.push(trans)
            this.container.appendChild(trans.getElement())
            trans.activate()
        })
    }
}


const viewAll = new ViewAll( document.getElementById('content') )
