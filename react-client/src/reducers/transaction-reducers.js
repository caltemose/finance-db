import {
    REQUEST_TRANSACTIONS,
    RECEIVE_TRANSACTIONS,
    EDIT_TRANSACTION_PENDING,
    EDIT_TRANSACTION_ERROR,
    EDIT_TRANSACTION_COMPLETE
} from '../actions/actions'

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

const updateById = (state, action) => {
    switch (action.type) {
        // case EDIT_TRANSACTION_PENDING:

        case EDIT_TRANSACTION_COMPLETE:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    payee: action.data.payee,
                    category: action.data.category
                }
            }

        // case EDIT_TRANSACTION_ERROR

        default:
            return state
    }
}

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

        case EDIT_TRANSACTION_COMPLETE:
            console.log(action.type)
            return {
                ...state,
                byId: updateById(state.byId, action)
            }

        default:
            return state
    }
}

export default transactions
