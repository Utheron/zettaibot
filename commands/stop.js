/**
* @from ZettaiBot
*/

// #############################################
// # REQUIRED
// #############################################
const Discord = require('discord.js');

// #############################################
// # CONSTANTS
// #############################################
const embed = new Discord.RichEmbed()
.setColor(color.warning)
.setTitle('ZettaiBot Quizz')
.setDescription(`Je ne suis connecté à aucun channel vocal ¯\\_(ツ)_/¯`);

exports.run = async (bot, message, args, guild) => {
    
    await message.delete();
    
    // If the user is not in a voice channel, send error message
    if(!message.member.voiceChannel) {
        message.channel.send(embed).then(msg => {
            msg.delete(5000)
        });
    }
    
    // If the bot is in a voice channel, leave
    if (message.guild.me.voiceChannel) {
        message.guild.me.voiceChannel.leave()
        return;
    }
    
}