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
    const startMonthFixed = Number(startMonth) + 1
    const endMonthFixed = Number(endMonth) + 1
    return fetch(`/api/transactions/from/${startMonthFixed}/${startYear}/to/${endMonthFixed}/${endYear}`)
        .then(response => {
            return response.json()
        })
        .then(transactions => {
            return dispatch(receiveTransactions(transactions))
        })
}
