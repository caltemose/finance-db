// import axios from 'axios'
import Ajax from './modules/ajax'
const ajax = new Ajax()

class Transaction {
    constructor (transaction) {
        this.data = transaction
        this.init()
    }

    init () {
        const transaction = this.data
        let formClasses = transaction.amount < 0 ?
            'transaction-form negative' : 'transaction-form positive'
        this.markup = `
            <form class="${formClasses}">
                <span class="transaction-date">${this.prettyDate(transaction.date)}</span>
                <span class="transaction-amount">${transaction.amount}</span>
                <input class="transaction-category" value="${transaction.category}" name="category" />
                <input class="transaction-payee" value="${transaction.payee}" name="payee" />
                <button type="submit">Update</button>
            </form>
        `
    }

    getMarkup () {
        return this.markup
    }

    prettyDate (timestamp) {
        let date = new Date(timestamp)
        return (date.getMonth()+1) + '/' + date.getDate() + '/' +  date.getFullYear()
    }
}

class ViewAll {
    constructor (container) {
        this.container = container
        this.loadTransactions()
        // this.form = form
        // this.filename = form.querySelector('input[name=filename]')
        // this.account = form.querySelector('input[name=account]')
        // this.submit = form.querySelector('button[type=submit]')
        // this.submit.addEventListener('click', (e) => this.onSubmit(e))
    }

    loadTransactions () {
        const displayTransactions = this.displayTransactions.bind(this)
        // axios.get('http://localhost:3333/api/transactions')
        //     .then((response) => {
        //         // console.log(response.data)
        //         displayTransactions(response.data)
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     })
        ajax.getJSON('http://localhost:3333/api/transactions').then((data) => {
            console.log(data)
        })
    }

    displayTransactions (transactions) {
        // let html = '<ul>';
        // transactions.map((transaction) => {
        //     html += `<li>${transaction.original.amount} : ${transaction.original.date} : ${transaction.original.description} : ${transaction.original.category}</li>`
        // })
        // html += '</ul>'
        // this.container.innerHTML = html
        transactions.map((transaction) => {
            let trans = new Transaction(transaction)
            this.container.innerHTML += trans.getMarkup()
        })
    }
}


const viewAll = new ViewAll( document.getElementById('content') )
