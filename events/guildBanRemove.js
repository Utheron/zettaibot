/**
* @from ZettaiBot
* @type guildBanRemove
*/

// #############################################
// # BAN REMOVE EVENT
// #############################################
module.exports = (bot, guild, user) => {
    const channel = guild.channels.find(ch => ch.name === config.defaultChannel);
    channel.send(`${user.username}'s ban has been lifted`);
}