const Command = require('../../Structures/Command');
const figlet = require('util').promisify(require('figlet'));

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ["echo", "talk", "repeat"],
            description: "I will say whatever you want me to.",
            usage: "<message>",
            category: 'Fun'
        });
    }

    async run(message, args) {

        if (!args.length) return message.channel.send("What do you want me to say?");
        return message.channel.send(args.join(" "), { disableMentions: "all" });

    }
}