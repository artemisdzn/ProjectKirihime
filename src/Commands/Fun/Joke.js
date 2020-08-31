const Command = require('../../Structures/Command');
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ["jk"],
            description: "Returns a random joke.",
            category: 'Fun'
        });
    }

    async run(message) {

        const body = await fetch("https://sv443.net/jokeapi/v2/joke/Any")
            .then((r) => r.json());

        if (body.error) return message.channel.send("Something went wrong with the API. Try again later.");
        const flags = Object.entries(body.flags).filter((x) => x[1]).map((x) => x[0]).join(", ");

        const embed = new MessageEmbed()
            .setColor(message.guild.me.displayHexColor || 'RANDOM')
            .setTitle(`${body.category}${flags ? ` (${flags})` : ""}`)
            .setDescription(body.type === "single" ? `${body.joke}` : `**${body.setup}**\n*${body.delivery}*`)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()

        return message.channel.send({ embed });

    }
}