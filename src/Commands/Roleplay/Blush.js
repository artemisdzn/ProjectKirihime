const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['blushes'],
            description: 'Roleplaying.',
            category: 'Roleplay'
        });
    }

    async run(message, args) {

        let gifs = [
            `https://cdn.discordapp.com/attachments/741841047050518568/741855017975414922/Blush.gif`,
            `https://cdn.discordapp.com/attachments/741841047050518568/741855021561544784/Blush2.gif`,
            `https://cdn.discordapp.com/attachments/741841047050518568/741855022136033370/Blush1.gif`,
            `https://cdn.discordapp.com/attachments/741841047050518568/741855028977074186/Blush3.gif`,
            `https://cdn.discordapp.com/attachments/741841047050518568/741855032982503505/Blush4.gif`,
            `https://cdn.discordapp.com/attachments/741841047050518568/741855038254612590/Blush5.gif`,
            `https://cdn.discordapp.com/attachments/741841047050518568/741855041891336233/Blush6.gif`,
            `https://cdn.discordapp.com/attachments/741841047050518568/741855050980261968/Blush7.gif`,
            `https://cdn.discordapp.com/attachments/741841047050518568/741855060195016804/Blush11.gif`,
            `https://cdn.discordapp.com/attachments/741841047050518568/741855061222883328/Blush8.gif`,
            `https://cdn.discordapp.com/attachments/741841047050518568/741855062019670126/Blush10.gif`,
            `https://cdn.discordapp.com/attachments/741841047050518568/741855463922204732/Bite9.gif`
        ];
        let pick = gifs[Math.floor(Math.random() * gifs.length)];

        const reason = args.join(" ");

        const embed = new MessageEmbed()
        embed.setImage(pick)
        embed.setColor(message.guild.me.displayHexColor || 'RANDOM')
        embed.setDescription(`${message.author} blushes ${reason ? ` ${reason}` : ""}`)
        return message.channel.send(embed);
    }

};
