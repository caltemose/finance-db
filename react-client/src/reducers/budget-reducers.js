import {
    CREATE_BUDGET_ERROR,
    CREATE_BUDGET_COMPLETE,
    CREATE_BUDGET_PENDING,
    REQUEST_CURRENT_BUDGET_PENDING,
    REQUEST_CURRENT_BUDGET_COMPLETE,
    REQUEST_BUDGET_PENDING,
    REQUEST_BUDGET_COMPLETE,
    REQUEST_BUDGETS_PENDING,
    REQUEST_BUDGETS_COMPLETE,
    EDIT_TRANSACTION_PENDING,
    EDIT_TRANSACTION_ERROR,
    EDIT_TRANSACTION_COMPLETE
} from '../actions/actions'

const defaultState = {
    createPending: false,
    createError: false,
    createComplete: false,
    editComplete: false,
    loadPending: false,
    loadError: false,
    current: {},
    selected: {},
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

const updateById = (state, action) => {
    return {
        ...state,
        [action.id]: {
            ...state[action.id],
            startDate: action.data.startDate,
            categories: action.data.categories
        }
    }
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

        case EDIT_TRANSACTION_PENDING:
            return state

        case EDIT_TRANSACTION_ERROR:
            return {
                ...state,
                editError: action.err
            }

        case EDIT_TRANSACTION_COMPLETE:
            return {
                ...state,
                editComplete: true,
                byId: updateById(state.byId, action)
            }

        case REQUEST_CURRENT_BUDGET_PENDING:
            return state

        case REQUEST_CURRENT_BUDGET_COMPLETE:
            return {
                ...state,
                current: action.budget
            }

        case REQUEST_BUDGET_PENDING:
            return state

        case REQUEST_BUDGET_COMPLETE:
            return {
                ...state,
                selected: action.budget
            }

        case REQUEST_BUDGETS_PENDING:
            return state

        case REQUEST_BUDGETS_COMPLETE:
            return {
                ...state,
                byId: createById(action.budgets),
                allIds: createAllIds(action.budgets)
            }

        default:
            return state
    }
}

export const getBudgetById = (state, id) => {
    return state.budgets.byId[id] || {}
}

export default budgets
