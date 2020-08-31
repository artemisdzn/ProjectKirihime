const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['highfives'],
            description: 'Roleplaying.',
            category: 'Roleplay'
        });
    }

    async run(message, args) {

        let gifs = [
            `https://cdn.discordapp.com/attachments/741841407383306291/741859062089777152/8.gif`,
            `https://cdn.discordapp.com/attachments/741841407383306291/741859054544224256/7.gif`,
            `https://cdn.discordapp.com/attachments/741841407383306291/741859044075241553/6.gif`,
            `https://cdn.discordapp.com/attachments/741841407383306291/741859038613995550/5.gif`,
            `https://cdn.discordapp.com/attachments/741841407383306291/741859024802414702/4.gif`,
            `https://cdn.discordapp.com/attachments/741841407383306291/741859008054427688/2.gif`,
            `https://cdn.discordapp.com/attachments/741841407383306291/741859001402261596/1.gif`
        ];
        let pick = gifs[Math.floor(Math.random() * gifs.length)];

        const reason = args.join(" ");

        const embed = new MessageEmbed()

        embed.setImage(pick)
        embed.setColor(message.guild.me.displayHexColor || 'RANDOM')
        embed.setDescription(`${message.author} highfives ${reason ? ` ${reason}` : ""}`)
        return message.channel.send(embed);
    }

};
