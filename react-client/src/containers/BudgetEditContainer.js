import { connect } from 'react-redux'
import { editBudget } from '../actions/actions'
import { getBudgetById } from '../reducers/budget-reducers'
import BudgetEditForm from '../components/budgets/BudgetEditForm'

const mapStateToProps = (state, ownProps) => ({
    categories: state.categories,
    budget: getBudgetById(state, ownProps.params.id),
    editComplete: state.budgets.editComplete
})

const mapDispatchToProps = ({
    editBudget
})

export default connect(mapStateToProps, mapDispatchToProps)(BudgetEditForm)
