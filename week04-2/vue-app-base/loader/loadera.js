let count = 0
module.exports = function(...args) {
    console.log(count++)
    return args
}