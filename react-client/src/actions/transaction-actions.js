// export const REQUEST_TRANSACTION = 'REQUEST_TRANSACTION'
export const REQUEST_TRANSACTIONS = 'REQUEST_TRANSACTIONS'
export const RECEIVE_TRANSACTIONS = 'RECEIVE_TRANSACTIONS'
// export const RECEIVE_TRANSACTION = 'RECEIVE_TRANSACTION'
export const EDIT_TRANSACTION_PENDING = 'EDIT_TRANSACTION_PENDING'
export const EDIT_TRANSACTION_COMPLETE = 'EDIT_TRANSACTION_COMPLETE'
export const EDIT_TRANSACTION_ERROR = 'EDIT_TRANSACTION_ERROR'

export const requestTransactions = () => {
    console.log('requestTransactions()')
    return {
        type: REQUEST_TRANSACTIONS
    }
}

// export const requestTransaction = () => {
//     console.log('requestTransaction()')
//     return {
//         type: REQUEST_TRANSACTION
//     }
// }

export const receiveTransactions = (transactions) => {
    console.log('receiveTransactions()')
    return {
        type: RECEIVE_TRANSACTIONS,
        items: transactions
    }
}

export const editTransactionPending = (id) => ({
    type: EDIT_TRANSACTION_PENDING,
    id
})

export const editTransactionComplete = (id, data) => ({
    type: EDIT_TRANSACTION_COMPLETE,
    id,
    data
})

export const editTransactionError = (err, id) => ({
    type: EDIT_TRANSACTION_ERROR,
    err,
    id
})

export const fetchTransactionsByDate = (startMonth, startYear, endMonth, endYear, category) => dispatch => {
    dispatch(requestTransactions())
    return fetch(`/api/transactions/from/${startMonth}/${startYear}/to/${endMonth}/${endYear}/${category}`)
        .then(response => {
            return response.json()
        })
        .then(transactions => {
            return dispatch(receiveTransactions(transactions))
        })
}

export const fetchTransactionsByCategory = (category) => dispatch => {
    dispatch(requestTransactions())
    return fetch(`/api/transactions/by-category/${category}`)
        .then(response => {
            return response.json()
        })
        .then(transactions => {
            return dispatch(receiveTransactions(transactions))
        })
}

// export const fetchTransactionById = (id) => dispatch => {
//     dispatch(requestTransaction())
//     return fetch(`/api/transactions/${id}`)
//         .then(response => {
//             return response.json()
//         })
//         .then(transaction => {
//             return dispatch(receiveTransaction(transaction))
//         })
// }

export const editTransaction = (id, payee, items) => (dispatch, getState) => {
    console.log('editTransaction', id, payee, items)
    dispatch(editTransactionPending(id))

    const data = { payee, items }
    const request = new Request(`/api/transactions/${id}/simple-edit/`, {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        method: 'PUT',
        body: JSON.stringify(data)
    })

    return fetch(request)
        .then(response => {
            return response.json()
        })
        .then(result => {
            // result.doc = original document in db
            return dispatch(editTransactionComplete(id, data))
        })
}
