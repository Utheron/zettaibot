/**
* @from ZettaiBot
* @type Latency check
*/

exports.run = async (bot, message) => {
    await message.delete();
    message.channel.send(`Your latency is ${Date.now() - message.createdTimestamp}ms`);
}