const Command = require('../../Structures/Command');
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['discorddocs'],
            description: `Returns discord.js documents.`,
            category: 'Programming',
            usage: '[document]'
        });
    }

    async run(message, args) {

        const [query, src] = args;
        if (!query) return message.channel.send("https://discord.js.org");

        const embed = await (await fetch(`https://djsdocs.sorta.moe/v2/embed?src=${src || "stable"}&q=${query.replace(/#/g, ".")}`)).json();
        if (!embed || embed.error) return message.channel.send("Nothing Found ");

        // delete everything until the next comment if you don't want to edit the embed
        const docEmbed = new MessageEmbed(embed)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setTitle(`Discord.js (${args[1] || "stable"})`)
            .setColor(message.guild.me.displayHexColor || 'RANDOM')
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

        return message.channel.send(docEmbed);

    }

};
