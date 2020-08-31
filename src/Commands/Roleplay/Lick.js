const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['licks'],
            description: 'Roleplaying.',
            category: 'Roleplay'
        });
    }

    async run(message, args) {

        let gifs = [
            `https://cdn.discordapp.com/attachments/741841490292113537/741860877208125450/7.gif`,
            `https://cdn.discordapp.com/attachments/741841490292113537/741860868161011812/6.gif`,
            `https://cdn.discordapp.com/attachments/741841490292113537/741860861861298246/5.gif`,
            `https://cdn.discordapp.com/attachments/741841490292113537/741860859558625382/4.gif`,
            `https://cdn.discordapp.com/attachments/741841490292113537/741860858463780894/3.gif`,
            `https://cdn.discordapp.com/attachments/741841490292113537/741860855083434054/2.gif`,
            `https://cdn.discordapp.com/attachments/741841490292113537/741860856056250418/1.gif`
        ];
        let pick = gifs[Math.floor(Math.random() * gifs.length)];

        const reason = args.join(" ");

        const embed = new MessageEmbed()

        embed.setImage(pick)
        embed.setColor(message.guild.me.displayHexColor || 'RANDOM')
        embed.setDescription(`${message.author} licks ${reason ? ` ${reason}` : ""}`)
        return message.channel.send(embed);
    }

};
