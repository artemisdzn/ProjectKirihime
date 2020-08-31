const Command = require('../../Structures/Command');
const urban = require('urban')
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require("common-tags");


module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ["urb", "urbandictionary", "ud"],
            description: "Gets an urban dictionary definition.",
            usage: "<search|random> (query)",
            category: 'Utilities'
        });
    }

    async run(message, args) {

        if (!args[0] || !["search", "random"].includes(args[0])) return message.channel.send(`\`${this.client.prefix}urban <search|random> (query)\``);
        const image = "http://cdn.marketplaceimages.windowsphone.com/v8/images/5c942bfe-6c90-45b0-8cd7-1f2129c6e319?imageType=ws_icon_medium";
        const search = args[1] ? urban(args.slice(1).join(" ")) : urban.random();
        try {
            search.first(res => {
                if (!res) return message.channel.send("No results found for this topic, sorry!");
                const { word, definition, example, thumbs_up, thumbs_down, permalink, author } = res;

                const embed = new MessageEmbed()
                    .setColor(message.guild.me.displayHexColor || 'RANDOM')
                    .setTitle(`Urban Dictionary | ${word}`)
                    .setThumbnail(image)
                    .setDescription(stripIndents`Defintion: ${definition || "No definition"}

                            Example: ${example || "No Example"}

                            Upvote: ${thumbs_up || 0}
                            Downvote: ${thumbs_down || 0}
                            Link: [link to ${word}](${permalink || "https://www.urbandictionary.com/"})`)
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.username} | Written by ${author || "unknown"}`, message.author.displayAvatarURL({ dynamic: true }));

                message.channel.send(embed)
            })
        } catch (e) {
            console.log(e)
            return message.channel.send("Something went wrong! Please try again.")
        }

    }
}