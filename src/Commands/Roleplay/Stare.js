const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['stares'],
            description: 'Roleplaying.',
            category: 'Roleplay'
        });
    }

    async run(message, args) {

        let gifs = [
            `https://cdn.discordapp.com/attachments/741841749865136229/741865135789965412/4.gif`,
            `https://cdn.discordapp.com/attachments/741841749865136229/741865128093417503/3.gif`,
            `https://cdn.discordapp.com/attachments/741841749865136229/741865124737843300/2.gif`,
            `https://cdn.discordapp.com/attachments/741841749865136229/741865120895860866/1.gif`,
            `https://cdn.discordapp.com/attachments/741841749865136229/741865120963231784/9.gif`,
            `https://cdn.discordapp.com/attachments/741841749865136229/741865115552579684/8.gif`,
            `https://cdn.discordapp.com/attachments/741841749865136229/741865109965504613/6.gif`,
            `https://cdn.discordapp.com/attachments/741841749865136229/741865105100111983/5.gif`
        ];
        let pick = gifs[Math.floor(Math.random() * gifs.length)];

        const reason = args.join(" ");

        const embed = new MessageEmbed()

        embed.setImage(pick)
        embed.setColor(message.guild.me.displayHexColor || 'RANDOM')
        embed.setDescription(`${message.author} stares ${reason ? ` ${reason}` : ""}`)
        return message.channel.send(embed);
    }

};
