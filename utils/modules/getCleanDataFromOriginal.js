module.exports = function getCleanDataFromOriginal (original, account) {
    let cleaned = {}
    cleaned.original = original
    cleaned.amount = original.amount
    cleaned.date = original.date
    cleaned.account = account

    // helper function to improve payee/category
    // cleaned = getPayeeAndCategory(cleaned)

    return cleaned
}
