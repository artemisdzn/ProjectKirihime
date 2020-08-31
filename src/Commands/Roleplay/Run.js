const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['runs'],
            description: 'Roleplaying.',
            category: 'Roleplay'
        });
    }

    async run(message, args) {

        let gifs = [
            `https://cdn.discordapp.com/attachments/741841661260464179/741862857465135104/4.gif`,
            `https://cdn.discordapp.com/attachments/741841661260464179/741862865127866448/5.gif`,
            `https://cdn.discordapp.com/attachments/741841661260464179/741862867053183056/6.gif`,
            `https://cdn.discordapp.com/attachments/741841661260464179/741862874372374648/7.gif`,
            `https://cdn.discordapp.com/attachments/741841661260464179/741862877589405847/9.gif`,
            `https://cdn.discordapp.com/attachments/741841661260464179/741862878419746846/8.gif`,
            `https://cdn.discordapp.com/attachments/741841661260464179/741862894450376725/1.gif`,
            `https://cdn.discordapp.com/attachments/741841661260464179/741862894534393937/10.gif`,
            `https://cdn.discordapp.com/attachments/741841661260464179/741862896836935720/2.gif`,
            `https://cdn.discordapp.com/attachments/741841661260464179/741862910019764254/3.gif`
        ];
        let pick = gifs[Math.floor(Math.random() * gifs.length)];

        const reason = args.join(" ");

        const embed = new MessageEmbed()

        embed.setImage(pick)
        embed.setColor(message.guild.me.displayHexColor || 'RANDOM')
        embed.setDescription(`${message.author} runs ${reason ? ` ${reason}` : ""}`)
        return message.channel.send(embed);
    }

};
