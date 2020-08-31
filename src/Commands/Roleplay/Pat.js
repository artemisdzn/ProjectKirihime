const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['pats'],
            description: 'Roleplaying.',
            category: 'Roleplay'
        });
    }

    async run(message, args) {

        let gifs = [
            `https://cdn.discordapp.com/attachments/741841531031388250/741861232444833872/13.gif`,
            `https://cdn.discordapp.com/attachments/741841531031388250/741861225184624690/12.gif`,
            `https://cdn.discordapp.com/attachments/741841531031388250/741861219362799676/11.gif`,
            `https://cdn.discordapp.com/attachments/741841531031388250/741861215860424785/10.gif`,
            `https://cdn.discordapp.com/attachments/741841531031388250/741861215860424785/10.gif`,
            `https://cdn.discordapp.com/attachments/741841531031388250/741861208449220678/9.gif`,
            `https://cdn.discordapp.com/attachments/741841531031388250/741861200337436772/7.gif`,
            `https://cdn.discordapp.com/attachments/741841531031388250/741861200303751258/8.gif`,
            `https://cdn.discordapp.com/attachments/741841531031388250/741861188370956318/6.gif`,
            `https://cdn.discordapp.com/attachments/741841531031388250/741861181903601724/5.gif`,
            `https://cdn.discordapp.com/attachments/741841531031388250/741861155659710534/2.gif`,
            `https://cdn.discordapp.com/attachments/741841531031388250/741861148768469032/1.gif`
        ];
        let pick = gifs[Math.floor(Math.random() * gifs.length)];

        const reason = args.join(" ");

        const embed = new MessageEmbed()

        embed.setImage(pick)
        embed.setColor(message.guild.me.displayHexColor || 'RANDOM')
        embed.setDescription(`${message.author} pats ${reason ? ` ${reason}` : ""}`)
        return message.channel.send(embed);
    }

};
