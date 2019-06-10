/**
* @from ZettaiBot
* @type Testing file
*/

// #############################################
// # REQUIRED
// #############################################
const Discord   = require('discord.js');
const fn        = require('../functions');

// #############################################
// # CONSTANTS
// #############################################
const limit     = config.limit; // Size of the questions pool

exports.run = async (bot, message, args) => {
    
    await message.delete();
    
    // Check if there's no argument or type INT, then return the list of quizz
    if (fn.isEmpty(args) || isNaN(args)) {
        var array = []
        for (var i in quizz) {
            array.push(`${i}. *${quizz[i].category}* - **${quizz[i].name}** by ${quizz[i].author}`);
        }
        
        // RichEmbed for question list
        const embed = new Discord.RichEmbed()
        .setColor(color.info)
        .setTitle(`**Quizz format *__texte__* **`)
        .setDescription(array)
        .addBlankField()
        .addField(`**Pour lancer un quizz**`, `**!quizz** suivit d'un espace et du nombre voulu`, true);
        
        message.channel.send(embed);
        return;
    };
    
    // If there is an argumnt of type INT, we return the list of questions
    if (fn.isInteger(args)) {
        
        // Shuffle the questions order
        const deck = quizz[args].questions;
        const hand = deck.sort(() => Math.floor(Math.random() * quizz[args].questions.length))
        
        // Index i set to 0
        var i = 0;
        
        // Loop through the questions
        while (i < limit) {
            
            // All answers from Quizz "insensitive fixed" to lowercase
            var Answer = deck[i].answer;
            var qAnswer = Answer.map(function(i) {
                return i.toLowerCase();
            })
            
            // Filter and options for message.channel.awaitMessages(filter,options)
            // TODO : fix the timer reset on each wrong answer
            const msg = m => m.content;
            let options = {
                max: 1,
                time: 25000,
                errors: ['time']
            };
            
            // RichEmbed for question asked
            const embed = new Discord.RichEmbed()
            .setColor(color.warning)
            .setTitle(hand[i].title);
            
            // Question delayed a little to prevent instant start
            setTimeout(function() {
                message.channel.send(embed);
            }, 1000)
            
            // trigger set to wrong answer
            let trigger = false;
            
            // Loop while the answer is wrong
            while (trigger === false) {
                
                // Wait for answers
                await message.channel.awaitMessages(msg, options)
                
                // Once an answer is collected
                .then(collected => {
                    
                    // User answer "insensitive fixed" to lowercase
                    var Answer = collected.first().content;
                    var uAnswer = Answer.toLowerCase();
                    
                    // Check if uAnswer match an entry in qAnswer and return the values
                    let match = qAnswer.reduce((r,v) => uAnswer.includes(v) && r.concat(v, " ") || r, "")
                    
                    if (match) {
                        // RichEmbed for right answer
                        const embed = new Discord.RichEmbed()
                        .setColor(color.right)
                        .setTitle(`**Bravo !**`)
                        .setDescription(`La bonne réponse était **${deck[i].full}**`)
                        .setURL(deck[i].proof)
                        .setFooter(`${collected.first().author.username}`, collected.first().author.avatarURL);
                        
                        message.channel.send(embed);
                        return trigger = true;
                    }
                    // If the answer is wrong, do something
                    
                })
                .catch(e => {
                    // RichEmbed for Time Up
                    const embed = new Discord.RichEmbed()
                    .setColor(color.warning)
                    .setTitle(`**Temps écoulé !**`)
                    .setDescription(`La bonne réponse était ||**${deck[i].full}**||`)
                    .setURL(deck[i].proof);
                    
                    message.channel.send(embed);
                    return trigger = true;
                })
            }
            // If answer is right, repeat the Loop and increment index i
            i++
        }
    }
    // RichEmbed for end of quizz
    const embed = new Discord.RichEmbed()
    .setColor(color.info)
    .setDescription(`Le Quizz est maintenant terminé. Merci d'avoir participé !`);
    message.channel.send(embed);
}