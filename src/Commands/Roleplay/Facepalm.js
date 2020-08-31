const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['facepalms'],
            description: 'Roleplaying.',
            category: 'Roleplay'
        });
    }

    async run(message, args) {

        let gifs = [
            `https://cdn.discordapp.com/attachments/741841190726402148/741857514282549289/Facepalm4.gif`,
            `https://cdn.discordapp.com/attachments/741841190726402148/741857506027896842/Facepalm3.gif`,
            `https://cdn.discordapp.com/attachments/741841190726402148/741857499623194724/Facepalm2.gif`,
            `https://cdn.discordapp.com/attachments/741841190726402148/741857495265575012/Facepalm1.gif`,
            `https://cdn.discordapp.com/attachments/741841190726402148/741857486331576320/Facepalm.gif`
        ];
        let pick = gifs[Math.floor(Math.random() * gifs.length)];

        const reason = args.join(" ");

        const embed = new MessageEmbed()

        embed.setImage(pick)
        embed.setColor(message.guild.me.displayHexColor || 'RANDOM')
        embed.setDescription(`${message.author} facepalms ${reason ? ` ${reason}` : ""}`)
        return message.channel.send(embed);
    }

};
