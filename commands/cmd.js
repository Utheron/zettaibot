/**
* @from ZettaiBot
* @type Help command
*/

// #############################################
// # REQUIRED
// #############################################
const Discord   = require('discord.js');
const fn        = require('../functions');

// #############################################
// # CONSTANTS
// #############################################
const desc = `Pour voir la liste des questionnaires disponible, saisir la commande souhaitée:\n\n**!quizz** pour un questionnaire textuel\n**!audio** pour un questionnaire musical\n**!pics** pour un questionnaire à images\n\nPour lancer le questionnaire, saisissez à nouveau la commande suivie d'un <espace> et du <nombre> voulu.`;

const embed = new Discord.RichEmbed()
.setColor(color.info)
.setTitle('ZettaiBot Commands')
.setDescription(desc);

exports.run = async (bot, message, args) => {
    await message.delete();

    if (fn.isEmpty(args) || isNaN(args)) {
        message.channel.send(embed);
        return;
    };

}