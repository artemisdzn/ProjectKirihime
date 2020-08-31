const Command = require('../../Structures/Command');
const fetch = require("node-fetch");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ["owo"],
            description: "OwO what could this be?",
            usage: '<text>',
            category: 'Fun'
        });
    }

    async run(message, args) {

        if (!args.length) return message.channel.send("What do you want me to owoify?");

        const { owo } = await fetch(`https://nekos.life/api/v2/owoify?text=${encodeURIComponent(args.join(" "))}`)
            .then((res) => res.json());

        return message.channel.send(owo);

    }
}