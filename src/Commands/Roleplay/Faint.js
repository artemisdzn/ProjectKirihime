const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['faints'],
            description: 'Roleplaying.',
            category: 'Roleplay'
        });
    }

    async run(message, args) {

        let gifs = [
            `https://cdn.discordapp.com/attachments/741841214260641873/741857768075558932/Faint3.gif`,
            `https://cdn.discordapp.com/attachments/741841214260641873/741857762509717576/Faint2.gif`,
            `https://cdn.discordapp.com/attachments/741841214260641873/741857754771357796/Faint1.gif`,
            `https://cdn.discordapp.com/attachments/741841214260641873/741857746537676891/Faint.gif`,
            `https://cdn.discordapp.com/attachments/741841214260641873/741857742108753960/Faint4.gif`
        ];
        let pick = gifs[Math.floor(Math.random() * gifs.length)];

        const reason = args.join(" ");

        const embed = new MessageEmbed()

        embed.setImage(pick)
        embed.setColor(message.guild.me.displayHexColor || 'RANDOM')
        embed.setDescription(`${message.author} faints ${reason ? ` ${reason}` : ""}`)
        return message.channel.send(embed);
    }

};
