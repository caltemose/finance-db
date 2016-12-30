export const CREATE_BUDGET_COMPLETE = 'CREATE_BUDGET_COMPLETE'

export const createBudgetComplete = () => ({
    type: CREATE_BUDGET_COMPLETE
})

export const createBudget = ( budgetObject ) => (dispatch, getState) => {
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
            return dispatch(createBudgetComplete())
        })
}
