const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: [],
            description: 'Roleplaying.',
            category: 'Roleplay'
        });
    }

    async run(message, args) {

        let gifs = [
            `https://cdn.discordapp.com/attachments/741841386357129227/741858655376506910/Happy3.gif`,
            `https://cdn.discordapp.com/attachments/741841386357129227/741858652495020052/Happy2.gif`,
            `https://cdn.discordapp.com/attachments/741841386357129227/741858651156906054/Happy1.gif`,
            `https://cdn.discordapp.com/attachments/741841386357129227/741858645813231656/Happy.gif`,
            `https://cdn.discordapp.com/attachments/741841386357129227/741858641820516372/Happy8.gif`,
            `https://cdn.discordapp.com/attachments/741841386357129227/741858637307183225/Happy6.gif`,
            `https://cdn.discordapp.com/attachments/741841386357129227/741858635839176784/Happy7.gif`,
            `https://cdn.discordapp.com/attachments/741841386357129227/741858633012215828/Happy5.gif`,
            `https://cdn.discordapp.com/attachments/741841386357129227/741858632714420264/Happy4.gif`
        ];
        let pick = gifs[Math.floor(Math.random() * gifs.length)];

        const reason = args.join(" ");

        const embed = new MessageEmbed()

        embed.setImage(pick)
        embed.setColor(message.guild.me.displayHexColor || 'RANDOM')
        embed.setDescription(`${message.author} is happy ${reason ? ` ${reason}` : ""}`)
        return message.channel.send(embed);
    }

};
