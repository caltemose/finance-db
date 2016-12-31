import {
    CREATE_BUDGET_ERROR,
    CREATE_BUDGET_COMPLETE,
    CREATE_BUDGET_PENDING } from '../actions/actions'

const defaultState = {
    createPending: false,
    createError: false,
    createComplete: false,
    loadPending: false,
    loadError: false,
    current: {},
    allIds: [],
    byId: {}
}

const budgets = (state = defaultState, action) => {
    switch (action.type) {
        case CREATE_BUDGET_PENDING:
            return {
                ...state,
                createPending: true
            }

        case CREATE_BUDGET_COMPLETE:
            return {
                ...state,
                current: action.budget,
                createPending: false,
                createComplete: true
            }

        case CREATE_BUDGET_ERROR:
            return {
                ...state,
                createError: action.err
            }

        default:
            return state
    }
}

export default budgets
