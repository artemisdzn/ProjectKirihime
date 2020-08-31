const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['hugs'],
            description: 'Roleplaying.',
            category: 'Roleplay'
        });
    }

    async run(message, args) {

        let gifs = [
            `https://cdn.discordapp.com/attachments/741841421815775252/741859342105706516/4.gif`,
            `https://cdn.discordapp.com/attachments/741841421815775252/741859350896967740/5.gif`,
            `https://cdn.discordapp.com/attachments/741841421815775252/741859366897975327/6.gif`,
            `https://cdn.discordapp.com/attachments/741841421815775252/741859371037753374/7.gif`,
            `https://cdn.discordapp.com/attachments/741841421815775252/741859380151975976/8.gif`,
            `https://cdn.discordapp.com/attachments/741841421815775252/741859393804566598/9.gif`,
            `https://cdn.discordapp.com/attachments/741841421815775252/741859408530767942/2.gif`
        ];
        let pick = gifs[Math.floor(Math.random() * gifs.length)];

        const reason = args.join(" ");

        const embed = new MessageEmbed()

        embed.setImage(pick)
        embed.setColor(message.guild.me.displayHexColor || 'RANDOM')
        embed.setDescription(`${message.author} hugs ${reason ? ` ${reason}` : ""}`)
        return message.channel.send(embed);
    }

};
