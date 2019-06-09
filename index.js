/**
Name: ZettaiBot
Author: Utheron
Description: node.js Discord Bot with discord.js module
Version: 0.1.4
Licence: GNU General Public Licence v3 or later
Licence URI: https://www.gnu.org/licenses/gpl-3.0.html
Tags: quiz, audio, picture, purge, client events, guild events
*/

// #############################################
// # CLIENT RELATED
// #############################################
const Discord       = require('discord.js');
const bot           = new Discord.Client();

// #############################################
// # PACKAGES
// #############################################
const fs            = require('fs');
const Enmap         = require('enmap');

// #############################################
// # PROJECT RELATED
// #############################################
const configFile    = require('./settings.json');
const quizzFile     = require('./quizz.json');
const picsFile      = require('./pics.json');
const audioFile     = require('./audio.json');
const colorFile     = require('./colorpicker.json');
// #############################################
config      = configFile;
quizz       = quizzFile;
pics        = picsFile;
audio       = audioFile;
color       = colorFile;
regToken    = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

// #############################################
// # BOT CONNECTION
// #############################################
bot.login(config.token);

// #############################################
// # LOOP THROUGH FOLDERS AND RETRIEVE EVENTS
// #############################################
fs.readdir('./events', (err, files) => {
    if (err) return console.log(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        const eventName = file.split(".")[0];
        bot.on(eventName, event.bind(null, bot));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});

// #############################################
// # LOOP THROUGH FOLDERS AND RETRIEVE COMMANDS
// #############################################
bot.commands = new Enmap();

fs.readdir("./commands", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Command loading... ${commandName}`);
        bot.commands.set(commandName, props);
    });
});