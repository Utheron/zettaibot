/**
* @from ZettaiBot
* @type Purge messages
*/

// #############################################
// # REQUIRED
// #############################################
const Discord   = require('discord.js');
const fn        = require('../functions');

// #############################################
// # CONSTANTS
// #############################################
const embed = new Discord.RichEmbed()
.setColor(color.error)
.setTitle('Commande non-autorisée');

exports.run = async (bot, message, args) => {
    await message.delete();
    if (message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {
        
        if (fn.isEmpty(args) || isNaN(args)) {
            message.channel.send(embed.setDescription(`**!purge** <nombre>\nVeuillez saisir un nombre`))
            .then(msg => {
                msg.delete(config.timer)
            });
        } else
        
        if (fn.isInteger(args)) {
            message.channel.fetchMessages({limit: args}).then(args => message.channel.bulkDelete(args));
            message.channel.send(embed.setTitle(`Suppression`).setDescription(`${args} messages ont été effacés`))
            .then(msg => {
                msg.delete(config.timer)
            });
        } return;
    }
    
    message.channel.send(embed.setDescription(`Tu n'as pas les permissions requises pour utiliser cette commande ¯\\_(ツ)_/¯`))
    .then(msg => {
        msg.delete(config.timer)
    });
}
