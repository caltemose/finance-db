// import axios from 'axios'
import Ajax from './modules/ajax'
const ajax = new Ajax()

class ImportView {
    constructor (form, results) {
        this.form = form
        this.filename = form.querySelector('input[name=filename]')
        this.account = form.querySelector('input[name=account]')
        this.submit = form.querySelector('button[type=submit]')
        this.submit.addEventListener('click', (e) => this.onSubmit(e))
        this.results = results
    }

    onSubmit (event) {
        event.preventDefault()
        if (this.account.value !== '' && this.filename.value !== '') {
            // POST value to /api/import
            const data = {
                file: this.filename.value,
                account: this.account.value
            }
            console.log('calling api/import')
            ajax.post('http://localhost:3333/api/import', data)
                .then((data) => {
                    this.renderResults(data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    renderResults (data) {
        let html = ''
        if (data.errors.length) {
            html += `<p>There were some errors: ${data.errors.length}</p>`
        }
        if (data.created.length) {
            html += `<p>Total Results: ${data.created.length}</p>`
        }
        this.results.innerHTML = html
    }
}

const importView = new ImportView(
    document.getElementById('importForm'),
    document.getElementById('results')
)
