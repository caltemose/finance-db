import {
    REQUEST_PAYEES_PENDING,
    REQUEST_PAYEES_COMPLETE,
    REQUEST_PAYEES_ERROR
} from '../actions/actions'

const defaultState = {
    createPending: false,
    createError: false,
    createComplete: false,
    editComplete: false,
    loadPending: false,
    loadError: false,
    allIds: [],
    byId: {}
}

const createAllIds = (items) => {
    return items.map(item => (item._id))
}

const createById = (items) => {
    const byId = {}
    items.forEach(item => {
        byId[item._id] = { ...item }
    })
    return byId
}

const payees = (state = defaultState, action) => {
    switch (action.type) {
        case REQUEST_PAYEES_PENDING:
            return state

        case REQUEST_PAYEES_COMPLETE:
            return {
                ...state,
                byId: createById(action.payees),
                allIds: createAllIds(action.payees)
            }
        
        case REQUEST_PAYEES_ERROR:
            return {
                ...state,
                loadError: true
            }

        default:
            return state
    }
}

export const getPayeeById = (state, id) => {
    return state.payees.byId[id] || {}
}

export default payees
