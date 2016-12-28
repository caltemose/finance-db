export const REQUEST_TRANSACTIONS = 'REQUEST_TRANSACTIONS'
export const RECEIVE_TRANSACTIONS = 'RECEIVE_TRANSACTIONS'

export const requestTransactions = () => ({
    type: REQUEST_TRANSACTIONS
})

export const receiveTransactions = (transactions) => ({
    type: RECEIVE_TRANSACTIONS,
    items: transactions
})

const fetchTransactionsByDate = (startMonth, startYear, endMonth, endYear) => dispatch => {
    dispatch(requestTransactions())
    return fetch(`/api/transactions/from/${startMonth}/${startYear}/to/${endMonth}/${endYear}`)
        .then(response => {
            return response.json()
        })
        .then(transactions => {
            return dispatch(receiveTransactions(transactions))
        })
}
