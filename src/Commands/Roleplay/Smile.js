const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['smiles'],
            description: 'Roleplaying.',
            category: 'Roleplay'
        });
    }

    async run(message, args) {

        let gifs = [
            `https://cdn.discordapp.com/attachments/741841733180063815/741864689629397022/4.gif`,
            `https://cdn.discordapp.com/attachments/741841733180063815/741864696168317030/5.gif`,
            `https://cdn.discordapp.com/attachments/741841733180063815/741864715248205894/8.gif`,
            `https://cdn.discordapp.com/attachments/741841733180063815/741864716003180634/7.gif`,
            `https://cdn.discordapp.com/attachments/741841733180063815/741864727692443748/10.gif`,
            `https://cdn.discordapp.com/attachments/741841733180063815/741864732742385747/1.gif`,
            `https://cdn.discordapp.com/attachments/741841733180063815/741864736437829722/2.gif`,
            `https://cdn.discordapp.com/attachments/741841733180063815/741864741131124866/3.gif`
        ];
        let pick = gifs[Math.floor(Math.random() * gifs.length)];

        const reason = args.join(" ");

        const embed = new MessageEmbed()

        embed.setImage(pick)
        embed.setColor(message.guild.me.displayHexColor || 'RANDOM')
        embed.setDescription(`${message.author} smiles ${reason ? ` ${reason}` : ""}`)
        return message.channel.send(embed);
    }

};
