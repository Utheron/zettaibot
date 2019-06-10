/**
* @from ZettaiBot
* @type functions
*/

module.exports = {
    isInteger: function(x) {
        return x % 1 === 0;
    },
    isEmpty: function(obj) {
        return Object.keys(obj).length === 0;
    },
    random: function(low, high) {
        return Math.floor(Math.random() * (high - low + 1) + low)
    },
    timeOut: function(m) {
        console.log(m);
    }
}