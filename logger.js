// *************************
// ******** REQUIRE ********
// *************************
const colors = require('colors/safe');

// **************************
// ******** FUNCTIONS *******
// **************************
var debug = function(log) {
    console.log(colors.magenta('[ Debug ]:'), colors.magenta(log));
}
var log = function(log) {
    console.log(colors.brightBlue('[ Log ]:'), colors.cyan(log));
}
var error = function(log) {
    console.log(colors.red('[ Error ]:'), colors.brightRed(log));
}

// *************************
// ******** EXPORTS ********
// *************************
module.exports.debug = debug;
module.exports.log = log;
module.exports.error = error;
