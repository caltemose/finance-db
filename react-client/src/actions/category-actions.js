export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const TOGGLE_CATEGORY = 'TOGGLE_CATEGORY'
export const TOGGLE_CATEGORY_COMPLETE = 'TOGGLE_CATEGORY_COMPLETE'

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

export const toggleCategory = (id) => ({
    type: TOGGLE_CATEGORY,
    id: id
})

export const toggleCategoryComplete = (id, newValue) => {
    console.log('toggleCategoryComplete', id)
    return {
        type: TOGGLE_CATEGORY_COMPLETE,
        id: id,
        inBudget: newValue
    }
}

export const toggleCategoryInBudget = (id, inBudget) => (dispatch, getState) => {
    dispatch(toggleCategory(id))
    const options = {
        method: 'PUT'
    }
    const newValue = !inBudget
    return fetch(`/api/categories/${id}/in-budget/${newValue}`, options)
        .then(response => {
            return response.json()
        })
        .then(result => {
            console.log('id', result.id)
            return dispatch(toggleCategoryComplete(result.id, newValue))
        })
}
