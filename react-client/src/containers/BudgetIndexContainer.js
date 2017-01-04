import { connect } from 'react-redux'
import { fetchBudgets } from '../actions/actions'
import BudgetIndex from '../components/budgets/BudgetIndex'

const mapStateToProps = (state) => ({
    budgets: state.budgets
})

const mapDispatchToProps = ({
    fetchBudgets
})

export default connect(mapStateToProps, mapDispatchToProps)(BudgetIndex)
