const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['bites'],
            description: 'Roleplaying.',
            category: 'Roleplay'
        });
    }

    async run(message, args) {

        let gifs = [
            `https://cdn.discordapp.com/attachments/741840896139460664/741854334848860270/Bite4.gif`,
            `https://cdn.discordapp.com/attachments/741840896139460664/741854336660799558/Bite3.gif`,
            `https://cdn.discordapp.com/attachments/741840896139460664/741854338120417290/Bite5.gif`,
            `https://cdn.discordapp.com/attachments/741840896139460664/741854338120679465/Bite6.gif`,
            `https://cdn.discordapp.com/attachments/741840896139460664/741854340972544073/Bite7.gif`,
            `https://cdn.discordapp.com/attachments/741840896139460664/741854343195656263/Bite8.gif`,
            `https://cdn.discordapp.com/attachments/741840896139460664/741854343250313316/Bite9.gif`,
            `https://cdn.discordapp.com/attachments/741840896139460664/741854346618339348/Bite10.gif`,
            `https://cdn.discordapp.com/attachments/741840896139460664/741854347352211516/Bite.gif`,
            `https://cdn.discordapp.com/attachments/741840896139460664/741854349504020540/Bite2.gif`,
            `https://cdn.discordapp.com/attachments/741840896139460664/741854382349484092/Bite1.gif`
        ];

        let pick = gifs[Math.floor(Math.random() * gifs.length)];

        const reason = args.join(" ");

        const embed = new MessageEmbed()
        embed.setImage(pick)
        embed.setColor(message.guild.me.displayHexColor || 'RANDOM')
        embed.setDescription(`${message.author} bites ${reason ? ` ${reason}` : ""}`)
        return message.channel.send(embed);
    }

};
