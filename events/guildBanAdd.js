/**
* @from ZettaiBot
* @type guildBanAdd
*/

// #############################################
// # BAN EVENT
// #############################################
module.exports = (bot, guild, user) => {
    const channel = guild.channels.find(ch => ch.name === config.defaultChannel);
    channel.send(`${user.username} has been banned`);
}