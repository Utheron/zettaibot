/**
* @from ZettaiBot
* @type guildMemberAdd
*/

// #############################################
// # WHEN A MEMBER JOINS THE GUILD
// #############################################
module.exports = (bot, member) => {
    const channel = member.guild.channels.find(ch => ch.name === config.defaultChannel);
    if (!channel) return;
    channel.send(`(づ￣ ³￣)づ Osuuuuuuu~ Here Comes a New Challenger: ${member.user.username}`);
}