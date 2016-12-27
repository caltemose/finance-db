import { connect } from 'react-redux'
import { toggleCategoryInBudget } from '../actions/actions'
import CategoryList from '../components/CategoryList'

const mapStateToProps = (state) => ({
    categories: state.categories.categories
})

const mapDispatchToProps = ({
    onInBudgetChange: toggleCategoryInBudget
})

const Categories = connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryList)

export default Categories
