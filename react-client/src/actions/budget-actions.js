export const CREATE_BUDGET_PENDING = 'CREATE_BUDGET_PENDING'
export const CREATE_BUDGET_COMPLETE = 'CREATE_BUDGET_COMPLETE'
export const CREATE_BUDGET_ERROR = 'CREATE_BUDGET_ERROR'
export const REQUEST_CURRENT_BUDGET_PENDING = 'REQUEST_CURRENT_BUDGET_PENDING'
export const REQUEST_CURRENT_BUDGET_COMPLETE = 'REQUEST_CURRENT_BUDGET_COMPLETE'
export const REQUEST_CURRENT_BUDGET_ERROR = 'REQUEST_CURRENT_BUDGET_ERROR'
export const REQUEST_BUDGET_PENDING = 'REQUEST_BUDGET_PENDING'
export const REQUEST_BUDGET_COMPLETE = 'REQUEST_BUDGET_COMPLETE'
export const REQUEST_BUDGET_ERROR = 'REQUEST_BUDGET_ERROR'
export const REQUEST_BUDGETS_PENDING = 'REQUEST_BUDGETS_PENDING'
export const REQUEST_BUDGETS_COMPLETE = 'REQUEST_BUDGETS_COMPLETE'
export const REQUEST_BUDGETS_ERROR = 'REQUEST_BUDGETS_ERROR'


export const createBudgetPending = () => ({
    type: CREATE_BUDGET_PENDING
})

export const createBudgetComplete = (id) => ({
    type: CREATE_BUDGET_COMPLETE,
    id
})

export const createBudgetError = (err) => ({
    type: CREATE_BUDGET_ERROR,
    err
})

export const requestCurrentBudgetPending = () => ({
    type: REQUEST_CURRENT_BUDGET_PENDING
})

export const requestCurrentBudgetComplete = (budget) => ({
    type: REQUEST_CURRENT_BUDGET_COMPLETE,
    budget
})

export const requestBudgetPending = () => ({
    type: REQUEST_BUDGET_PENDING
})

export const requestBudgetComplete = (budget) => ({
    type: REQUEST_BUDGET_COMPLETE,
    budget
})

export const requestBudgetsPending = () => ({
    type: REQUEST_BUDGETS_PENDING
})

export const requestBudgetsComplete = (budgets) => ({
    type: REQUEST_BUDGETS_COMPLETE,
    budgets
})

export const createBudget = ( budgetObject ) => (dispatch, getState) => {
    dispatch(createBudgetPending())

    // TODO make a global helper for POST requests
    const request = new Request('/api/budgets/', {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        method: 'POST',
        body: JSON.stringify(budgetObject)
    })

    return fetch(request)
        .then(response => {
            return response.json()
        })
        .then(result => {
            console.log('budget created', result)
            return dispatch(createBudgetComplete(result._id))
        })
}

export const fetchCurrentBudget = () => dispatch => {
    dispatch(requestCurrentBudgetPending())
    return fetch('/api/budgets/current')
        .then(response => {
            return response.json()
        })
        .then(budget => {
            return dispatch(requestCurrentBudgetComplete(budget))
        })
}

export const fetchBudgetInRange = (startMonth, startYear) => dispatch => {
    dispatch(requestBudgetPending())
    return fetch(`/api/budgets/from/${startMonth}/${startYear}`)
        .then(response => {
            return response.json()
        })
        .then(budget => {
            return dispatch(requestBudgetComplete(budget))
        })
}

export const fetchBudgets = () => dispatch => {
    dispatch(requestBudgetsPending())
    return fetch('/api/budgets')
        .then(response => {
            return response.json()
        })
        .then(budgets => {
            return dispatch(requestBudgetsComplete(budgets))
        })
}
