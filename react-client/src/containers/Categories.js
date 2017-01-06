import { connect } from 'react-redux'
import { toggleCategoryInBudget, createCategory } from '../actions/actions'
import CategoryList from '../components/CategoryList'

const mapStateToProps = (state) => ({
    categories: state.categories
})

const mapDispatchToProps = ({
    onInBudgetChange: toggleCategoryInBudget,
    createCategory
})

const Categories = connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryList)

export default Categories
