import { connect } from 'react-redux'
import BudgetIndex from '../components/budgets/BudgetIndex'

const mapStateToProps = (state) => ({
    budgets: state.budgets
})

export default connect(mapStateToProps)(BudgetIndex)
