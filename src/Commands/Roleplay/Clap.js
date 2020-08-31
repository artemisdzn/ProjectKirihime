const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['claps'],
            description: 'Roleplaying.',
            category: 'Roleplay'
        });
    }

    async run(message, args) {

        let gifs = [
            `https://cdn.discordapp.com/attachments/741841083213807627/741855598123155476/Clap.gif`,
            `https://cdn.discordapp.com/attachments/741841083213807627/741855598563426364/Clap1.gif`,
            `https://cdn.discordapp.com/attachments/741841083213807627/741855604506624060/Clap2.gif`,
            `https://cdn.discordapp.com/attachments/741841083213807627/741855606989783160/Clap5.gif`,
            `https://cdn.discordapp.com/attachments/741841083213807627/741855606972874792/Clap4.gif`,
            `https://cdn.discordapp.com/attachments/741841083213807627/741855609284067388/Clap6.gif`,
            `https://cdn.discordapp.com/attachments/741841083213807627/741855609389056120/Clap3.gif`,
            `https://cdn.discordapp.com/attachments/741841083213807627/741855610374717521/Clap7.gif`
        ];
        let pick = gifs[Math.floor(Math.random() * gifs.length)];

        const reason = args.join(" ");

        const embed = new MessageEmbed()
        embed.setImage(pick)
        embed.setColor(message.guild.me.displayHexColor || 'RANDOM')
        embed.setDescription(`${message.author} claps ${reason ? ` ${reason}` : ""}`)
        return message.channel.send(embed);
    }

};
