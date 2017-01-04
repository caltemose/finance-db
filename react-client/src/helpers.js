import moment from 'moment'

export const prettyDate = dateStamp => (
    moment(dateStamp).format('YYYY/MM/DD')
)

export const prettyAmount = (amount, decimals = 2) => (
    Number(amount).toFixed(decimals)
)
