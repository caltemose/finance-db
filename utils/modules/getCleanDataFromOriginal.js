module.exports = function getCleanDataFromOriginal (original, account) {
    let cleaned = {}
    // the original unmodified data from the bank
    cleaned.original = original

    // parse the original data into data common to the entire transaction
    cleaned.amount = original.amount
    cleaned.date = original.date
    cleaned.account = account
    cleaned.payee = getPayeeFromOriginal(original)

    // transaction info goes into an array to support splits
    cleaned.items = [
        {
            description: '',
            // map the original category if we can
            category: getCategoryFromOriginal(original.category),
            // default to the total amount - most transactions will not be split
            amount: cleaned.amount
        }
    ]
    return cleaned
}

function getPayeeFromOriginal (original) {
    // TODO payees should live in db and be looked up then referenced by ID if found
    return original.descriptionEdited ? original.descriptionEdited : original.description
}

function getCategoryFromOriginal (category) {
    // TODO look this up in DB and/or lookup table to convert to appropriate known category
    return category
}