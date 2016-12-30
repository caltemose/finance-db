export const REQUEST_TRANSACTIONS = 'REQUEST_TRANSACTIONS'
export const RECEIVE_TRANSACTIONS = 'RECEIVE_TRANSACTIONS'

export const requestTransactions = () => {
    console.log('requestTransactions()')
    return {
        type: REQUEST_TRANSACTIONS
    }
}

export const receiveTransactions = (transactions) => {
    console.log('receiveTransactions()')
    return {
        type: RECEIVE_TRANSACTIONS,
        items: transactions
    }
}

export const fetchTransactionsByDate = (startMonth, startYear, endMonth, endYear) => dispatch => {
    dispatch(requestTransactions())
    return fetch(`/api/transactions/from/${startMonth}/${startYear}/to/${endMonth}/${endYear}`)
        .then(response => {
            return response.json()
        })
        .then(transactions => {
            return dispatch(receiveTransactions(transactions))
        })
}
