const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['pokes'],
            description: 'Roleplaying.',
            category: 'Roleplay'
        });
    }

    async run(message, args) {

        let gifs = [
            `https://cdn.discordapp.com/attachments/741841578154262620/741861810755338240/11.gif`,
            `https://cdn.discordapp.com/attachments/741841578154262620/741861804220612648/10.gif`,
            `https://cdn.discordapp.com/attachments/741841578154262620/741861799959199804/9.gif`,
            `https://cdn.discordapp.com/attachments/741841578154262620/741861795521888337/8.gif`,
            `https://cdn.discordapp.com/attachments/741841578154262620/741861795521888337/8.gif`,
            `https://cdn.discordapp.com/attachments/741841578154262620/741861790010572890/6.gif`,
            `https://cdn.discordapp.com/attachments/741841578154262620/741861788982706276/7.gif`,
            `https://cdn.discordapp.com/attachments/741841578154262620/741861780569194496/5.gif`,
            `https://cdn.discordapp.com/attachments/741841578154262620/741861769819062302/3.gif`,
            `https://cdn.discordapp.com/attachments/741841578154262620/741861765859508275/2.gif`
        ];
        let pick = gifs[Math.floor(Math.random() * gifs.length)];

        const reason = args.join(" ");

        const embed = new MessageEmbed()

        embed.setImage(pick)
        embed.setColor(message.guild.me.displayHexColor || 'RANDOM')
        embed.setDescription(`${message.author} pokes ${reason ? ` ${reason}` : ""}`)
        return message.channel.send(embed);
    }

};
