import { connect } from 'react-redux'
import { getCategoriesInBudget } from '../reducers/category-reducers'
import { createBudget } from '../actions/actions'
import BudgetCreateForm from '../components/budgets/BudgetCreateForm'

const mapStateToProps = (state) => ({
    categories: state.categories.byId,
    categoriesInBudget: getCategoriesInBudget(state)
})

const mapDispatchToProps = ({
    createBudget
})

export default connect(mapStateToProps, mapDispatchToProps)(BudgetCreateForm)
