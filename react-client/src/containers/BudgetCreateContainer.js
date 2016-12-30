import { connect } from 'react-redux'
import { getCategoriesInBudget } from '../reducers/category-reducers'
import BudgetCreateForm from '../components/budgets/BudgetCreateForm'

const mapStateToProps = (state) => ({
    categories: state.categories.byId,
    categoriesInBudget: getCategoriesInBudget(state)
})

const mapDispatchToProps = ({
})

export default connect(mapStateToProps, mapDispatchToProps)(BudgetCreateForm)
