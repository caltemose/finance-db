module.exports = function convertTransactionToV2 (transaction) {
    let item = {
        description: transaction.payee,
        category: transaction.category,
        amount: transaction.amount
    }
    let updated = Object.assign({}, transaction)
    delete updated.category
    updated.items = [ item ]
    return updated
}
