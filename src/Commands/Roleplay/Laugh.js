const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['laughs'],
            description: 'Roleplaying.',
            category: 'Roleplay'
        });
    }

    async run(message, args) {

        let gifs = [
            `https://cdn.discordapp.com/attachments/741841475259596821/741860592754753616/8.gif`,
            `https://cdn.discordapp.com/attachments/741841475259596821/741860590531641387/7.gif`,
            `https://cdn.discordapp.com/attachments/741841475259596821/741860584391180378/6.gif`,
            `https://cdn.discordapp.com/attachments/741841475259596821/741860578519285790/5.gif`,
            `https://cdn.discordapp.com/attachments/741841475259596821/741860575402917938/4.gif`,
            `https://cdn.discordapp.com/attachments/741841475259596821/741860569761447936/3.gif`,
            `https://cdn.discordapp.com/attachments/741841475259596821/741860560324263996/2.gif`,
            `https://cdn.discordapp.com/attachments/741841475259596821/741860554859085864/1.gif`
        ];
        let pick = gifs[Math.floor(Math.random() * gifs.length)];

        const reason = args.join(" ");

        const embed = new MessageEmbed()

        embed.setImage(pick)
        embed.setColor(message.guild.me.displayHexColor || 'RANDOM')
        embed.setDescription(`${message.author} laughs ${reason ? ` ${reason}` : ""}`)
        return message.channel.send(embed);
    }

};
