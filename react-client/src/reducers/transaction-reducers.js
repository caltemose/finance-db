import {
    REQUEST_TRANSACTIONS,
    RECEIVE_TRANSACTIONS } from '../actions/actions'

const createAllIds = (transactions) => {
    return transactions.map(transaction => (transaction._id))
}

const createById = (transactions) => {
    const byId = {}
    transactions.forEach(transaction => {
        byId[transaction._id] = { ...transaction }
    })
    return byId
}

// const updateById = (state, action) => {
//     switch (action.type) {
//         default:
//             return state
//     }
// }

const defaultState = {
    isFetching: false,
    byId: {},
    allIds: []
}

const transactions = (state = defaultState, action) => {
    switch (action.type) {
        case REQUEST_TRANSACTIONS:
            console.log(action.type)
            return {
                ...state,
                isFetching: true
            }

        case RECEIVE_TRANSACTIONS:
            console.log(action.type)
            return {
                ...state,
                isFetching: false,
                byId: createById(action.items),
                allIds: createAllIds(action.items)
            }

        default:
            return state
    }
}

export default transactions
