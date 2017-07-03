const args = require('args')

module.exports = function getArg (arg) {
    args.option(arg, arg)
    const flags = args.parse(process.argv)
    return flags[arg]
}
