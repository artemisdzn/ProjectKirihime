const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const { default: fetch } = require('node-fetch');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['shoots'],
            description: 'Roleplaying.',
            category: 'Roleplay'
        });
    }

    async run(message, args) {

        let gifs = [
            `https://cdn.discordapp.com/attachments/745881337998868570/745881438687068261/1.gif`,
            `https://cdn.discordapp.com/attachments/745881337998868570/745881446060916796/2.gif`,
            `https://cdn.discordapp.com/attachments/745881337998868570/745881453505675264/3.gif`,
            `https://cdn.discordapp.com/attachments/745881337998868570/745881463521804348/4.gif`,
            `https://cdn.discordapp.com/attachments/745881337998868570/745881470148673576/5.gif`
        ];

        let pick = gifs[Math.floor(Math.random() * gifs.length)];

        const reason = args.join(" ");

        const embed = new MessageEmbed()

        embed.setImage(pick)
        embed.setColor(message.guild.me.displayHexColor || 'RANDOM')
        embed.setDescription(`${message.author} shoots ${reason ? ` ${reason}` : ""}`)
        return message.channel.send(embed);
    }

};
