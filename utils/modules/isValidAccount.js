const VALID_ACCOUNTS = ['usaa-checking', 'usaa-credit']

module.exports = function isValidAccount (account) {
    return VALID_ACCOUNTS.includes(account)
}
