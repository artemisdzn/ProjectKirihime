const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['cries'],
            description: 'Roleplaying.',
            category: 'Roleplay'
        });
    }

    async run(message, args) {

        let gifs = [
            `https://cdn.discordapp.com/attachments/741841104382459914/741856038956826664/Cry2.gif`,
            `https://cdn.discordapp.com/attachments/741841104382459914/741856040215117824/Cry3.gif`,
            `https://cdn.discordapp.com/attachments/741841104382459914/741856039263010936/Cry1.gif`,
            `https://cdn.discordapp.com/attachments/741841104382459914/741856040920023180/Cry.gif`,
            `https://cdn.discordapp.com/attachments/741841104382459914/741856043251925082/Cry4.gif`,
            `https://cdn.discordapp.com/attachments/741841104382459914/741856046997307492/Cry5.gif`,
            `https://cdn.discordapp.com/attachments/741841104382459914/741856049992171520/Cry7.gif`,
            `https://cdn.discordapp.com/attachments/741841104382459914/741856050319196280/Cry8.gif`,
            `https://cdn.discordapp.com/attachments/741841104382459914/741856050403213322/Cry6.gif`
        ];
        let pick = gifs[Math.floor(Math.random() * gifs.length)];

        const reason = args.join(" ");

        const embed = new MessageEmbed()

        embed.setImage(pick)
        embed.setColor(message.guild.me.displayHexColor || 'RANDOM')
        embed.setDescription(`${message.author} cries ${reason ? ` ${reason}` : ""}`)
        return message.channel.send(embed);
    }

};
