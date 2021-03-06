const Command = require('../../Structures/Command');

const answers = [

    `It is certain.`,
    `It is decidedly so.`,
    `Without a doubt.`,
    "Yes - definitely.",
    "You may rely on it.",
    "As I see it, yes.",
    "Most likely.",
    "Outlook good.",
    "Yes.",
    "Signs point to yes.",
    "Reply hazy, try again.",
    "Ask again later.",
    "Better not tell you now.",
    "Cannot predict now.",
    "Concentrate and ask again.",
    "Don't count on it.",
    "My reply is no.",
    "My sources say no.",
    "Outlook not so good.",
    "Very doubtful.",
    "Maybe",
    "That is sure as hell.",
    "Fire.",
    "Indeed.",
    "Try to be usefull.",
    "Watch the birds.",
    "Gold.",
    "Answer is uncertain.",
    "You are the master of your life",
    "Maybe no.",
    "We can not be never sure.",
    "As you wish.",
    "Eat less, move more.",
    "Better ask yourself.",
    "Just do it.",
    "Sorry, but this is really stupid question.",
    "Try to be usefull.",
    "Water.",
    "We can not be never sure.",
    "You already know the Answer.",
    "Very bad idea.",
    "Never.",
    "Maybe yes.",
    "Mabye no."

]

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ["eightball", "ball", "magic8"],
            description: "Ask the magic 8ball anything.",
            usage: "<question>",
            category: 'Fun'
        });
    }

    async run(msg, ...question) {

        return msg.channel.send(question.join(' ').endsWith('?') ?
            `🎱 ${answers[Math.floor(Math.random() * answers.length)]}` :
            '🎱 That doesn\'t seem to be a question, please try again!')

    }
}