export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const TOGGLE_CATEGORY = 'TOGGLE_CATEGORY'

export const requestCategories = () => ({
    type: REQUEST_CATEGORIES
})

export const receiveCategories = (categories) => {
    return {
        type: RECEIVE_CATEGORIES,
        items: categories
    }
}

const fetchCategories = () => dispatch => {
    dispatch(requestCategories())
    return fetch('/api/categories')
        .then(response => {
            return response.json()
        })
        .then(categories => {
            return dispatch(receiveCategories(categories))
        })
}

export const fetchCategoriesIfNeeded = () => (dispatch, getState) => {
    return dispatch(fetchCategories())
}

export const toggleCategoryInBudget = (id) => ({
    type: TOGGLE_CATEGORY,
    id
})
