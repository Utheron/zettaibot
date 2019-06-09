/**
* @from ZettaiBot
*/

// #############################################
// # WHEN A MEMBER LEAVES THE GUILD
// #############################################
module.exports = (bot, member) => {
    const channel = member.guild.channels.find(ch => ch.name === config.defaultChannel);
    if (!channel) return;
    channel.send(`（　ﾟДﾟ） Yamerooooooooooo~ ${member.user.username} has left`);
}