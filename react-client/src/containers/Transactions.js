import { connect } from 'react-redux'
// import {  } from '../actions/actions'
import TransactionsList from '../components/transactions/TransactionsList'

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = ({

})

const Transactions = connect(
    mapStateToProps,
    mapDispatchToProps
)(TransactionsList)

export default Transactions
