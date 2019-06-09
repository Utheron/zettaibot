/**
* @from ZettaiBot
*/

// #############################################
// # DISTINCTION BETWEEN PREFIX AND COMMAND
// #############################################
module.exports = (bot, message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;

  const args    = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd     = bot.commands.get(command);

  if (!cmd) return;
  cmd.run(bot, message, args);
};