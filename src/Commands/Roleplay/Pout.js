const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['pouts'],
            description: 'Roleplaying.',
            category: 'Roleplay'
        });
    }

    async run(message, args) {

        let gifs = [
            `https://cdn.discordapp.com/attachments/741841600333873152/741862259097337926/Pout10.gif`,
            `https://cdn.discordapp.com/attachments/741841600333873152/741862253753532496/Pout9.gif`,
            `https://cdn.discordapp.com/attachments/741841600333873152/741862252122079252/Pout8.gif`,
            `https://cdn.discordapp.com/attachments/741841600333873152/741862250465460245/Pout7.gif`,
            `https://cdn.discordapp.com/attachments/741841600333873152/741862243687465000/Pout6.gif`,
            `https://cdn.discordapp.com/attachments/741841600333873152/741862238939381811/Pout5.gif`,
            `https://cdn.discordapp.com/attachments/741841600333873152/741862236808544296/Pout4.gif`,
            `https://cdn.discordapp.com/attachments/741841600333873152/741862232014716959/Pout3.gif`,
            `https://cdn.discordapp.com/attachments/741841600333873152/741862229560787026/Pout2.gif`,
            `https://cdn.discordapp.com/attachments/741841600333873152/741862202515914822/Pout1.gif`,
            `https://cdn.discordapp.com/attachments/741841600333873152/741862189471760495/Pout.gif`
        ];
        let pick = gifs[Math.floor(Math.random() * gifs.length)];

        const reason = args.join(" ");

        const embed = new MessageEmbed()

        embed.setImage(pick)
        embed.setColor(message.guild.me.displayHexColor || 'RANDOM')
        embed.setDescription(`${message.author} pouts ${reason ? ` ${reason}` : ""}`)
        return message.channel.send(embed);
    }

};
