import {
    REQUEST_CATEGORIES,
    RECEIVE_CATEGORIES,
    TOGGLE_CATEGORY,
    TOGGLE_CATEGORY_COMPLETE } from '../actions/actions'

const createAllIds = (categories) => {
    return categories.map(category => (category._id))
}

const createById = (categories) => {
    const byId = {}
    categories.forEach(category => {
        byId[category._id] = { ...category }
    })
    return byId
}

const updateById = (state, action) => {
    switch (action.type) {
        case TOGGLE_CATEGORY_COMPLETE:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    inBudget: action.inBudget
                }
            }
        default:
            return state
    }
}

const defaultState = {
    isFetching: false,
    byId: {},
    allIds: []
}

const categories = (state = defaultState, action) => {
    switch (action.type) {
        case REQUEST_CATEGORIES:
            console.log(action.type)
            return {
                ...state,
                isFetching: true
            }

        case RECEIVE_CATEGORIES:
            console.log(action.type)
            return {
                ...state,
                isFetching: false,
                byId: createById(action.items),
                allIds: createAllIds(action.items)
            }

        case TOGGLE_CATEGORY:
            console.log(action.type, action.id)
            return state

        case TOGGLE_CATEGORY_COMPLETE:
            console.log(action.type)
            return {
                ...state,
                byId: updateById(state.byId, action)
            }

        default:
            return state
    }
}

export const getCategoriesInBudget = (state) => {
    const { categories: { allIds, byId } } = state
    return allIds.filter(id => byId[id].inBudget)
}

export default categories
