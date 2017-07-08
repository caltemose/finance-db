export const REQUEST_PAYEES_PENDING = 'REQUEST_PAYEES_PENDING'
export const REQUEST_PAYEES_COMPLETE = 'REQUEST_PAYEES_COMPLETE'
export const REQUEST_PAYEES_ERROR = 'REQUEST_PAYEES_ERROR'

export const requestPayeesPending = () => ({
    type: REQUEST_PAYEES_PENDING
})

export const requestPayeesComplete = (payees) => ({
    type: REQUEST_PAYEES_COMPLETE,
    payees
})

export const fetchPayees = () => dispatch => {
    dispatch(requestPayeesPending())
    return fetch('/api/payees')
        .then(response => {
            return response.json()
        })
        .then(payees => {
            return dispatch(requestPayeesComplete(payees))
        })
}

