export const CREATE_BUDGET_COMPLETE = 'CREATE_BUDGET_COMPLETE'

export const createBudgetComplete = () => ({
    type: CREATE_BUDGET_COMPLETE
})

export const createBudget = ( budgetObject ) => (dispatch, getState) => {
    const options = {
        method: 'POST',
        body: budgetObject
    }
    return fetch(`/api/budgets/`, options)
        .then(response => {
            return response.json()
        })
        .then(result => {
            console.log('budget created', result)
            return dispatch(createBudgetComplete())
        })
}
