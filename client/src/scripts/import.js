import axios from 'axios'

class ImportView {
    constructor (form) {
        this.form = form
        this.input = form.querySelector('input[name=filename]')
        this.submit = form.querySelector('button[type=submit]')
        this.submit.addEventListener('click', (e) => this.onSubmit(e))
    }

    onSubmit (event) {
        event.preventDefault()
        if (this.input.value !== '') {
            // POST value to /api/import
            const data = { file: this.input.value }
            axios.post('http://localhost:3333/api/import', data)
                .then((response) => {
                    console.log(response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}

const importView = new ImportView( document.getElementById('importForm') )
