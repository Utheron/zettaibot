/**
* @from ZettaiBot
* @type ready
*/

// #############################################
// # PACKAGES
// #############################################
const chalk = require('chalk');

// #############################################
// # ON SUCCESSFUL CONNECTION AND READY
// #############################################
module.exports = (bot) => {
    console.log(
        chalk.inverse(`##################################\n#--    ZettaiBot now Online    --#\n##################################`)
        );
    }