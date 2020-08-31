const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['kisses'],
            description: 'Roleplaying.',
            category: 'Roleplay'
        });
    }

    async run(message, args) {

        let gifs = [
            `https://cdn.discordapp.com/attachments/741841456188227644/741860215024255006/8.gif`,
            `https://cdn.discordapp.com/attachments/741841456188227644/741860210137628743/7.gif`,
            `https://cdn.discordapp.com/attachments/741841456188227644/741860204844548106/6.gif`,
            `https://cdn.discordapp.com/attachments/741841456188227644/741860202550132777/5.gif`,
            `https://cdn.discordapp.com/attachments/741841456188227644/741860200914616481/4.gif`,
            `https://cdn.discordapp.com/attachments/741841456188227644/741860193243234304/3.gif`,
            `https://cdn.discordapp.com/attachments/741841456188227644/741860189250125906/2.gif`,
            `https://cdn.discordapp.com/attachments/741841456188227644/741860178596593775/1.gif`
        ];
        let pick = gifs[Math.floor(Math.random() * gifs.length)];

        const reason = args.join(" ");

        const embed = new MessageEmbed()

        embed.setImage(pick)
        embed.setColor(message.guild.me.displayHexColor || 'RANDOM')
        embed.setDescription(`${message.author} kisses ${reason ? ` ${reason}` : ""}`)
        return message.channel.send(embed);
    }

};
