export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const TOGGLE_CATEGORY = 'TOGGLE_CATEGORY'
export const TOGGLE_CATEGORY_COMPLETE = 'TOGGLE_CATEGORY_COMPLETE'
export const CREATE_CATEGORY_COMPLETE = 'CREATE_CATEGORY_COMPLETE'

export const requestCategories = () => ({
    type: REQUEST_CATEGORIES
})

export const receiveCategories = (categories) => {
    console.log('receiveCategories()')
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

export const createCategoryComplete = (id, category) => {
    console.log('createCategoryComplete', id)
    return {
        type: CREATE_CATEGORY_COMPLETE,
        id,
        category
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

export const createCategory = (categoryName, inBudget) => (dispatch) => {
    const category = {
        category: categoryName,
        inBudget: inBudget
    }

    const request = new Request('/api/categories/', {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        method: 'POST',
        body: JSON.stringify(category)
    })

    return fetch(request)
        .then(response => {
            return response.json()
        })
        .then(result => {
            console.log('category created', result)
            const newCategory = {
                ...category,
                _id: result._id
            }
            return dispatch(createCategoryComplete(result._id, newCategory))
        })
}
