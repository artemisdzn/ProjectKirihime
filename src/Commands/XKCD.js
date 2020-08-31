const Command = require('../Structures/Command');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');


module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            description: "xkcd comics, get the latest or certain comic",
            usage: "<search|latest> (id)"
        });
    }

    async run(message, args) {

        if ((args[1] && isNaN(args[1])) || !["search", "latest"].includes(args[0])) return message.channel.send(`\`${this.client.prefix}xkcd <search|latest> (id)\``);
        const search = args[1] ? `http://xkcd.com/${args[1]}/info.0.json` : "http://xkcd.com/info.0.json";
        try {
            fetch(search).then(res => res.json()).then(res => {
                if (!res) return message.channel.send("No results found for this comic, sorry!");
                const { safe_title, img, day, month, year, num, alt } = res;

                const embed = new MessageEmbed()
                    .setColor(message.guild.me.displayHexColor || 'RANDOM')
                    .setDescription(alt ? alt : "No Description")
                    .setTitle(`XKCD | ${safe_title} [${num}]`)
                    .setImage(img)
                    .setFooter(`Requested by ${message.author.username} | Published ${day}/${month}/${year}`, message.author.displayAvatarURL({ dynamic: true }))
                    .setTimestamp();

                message.channel.send(embed)
            })
        } catch (e) {
            console.log(e)
            return message.channel.send("Something went wrong! Please try again.")
        }

    }
}