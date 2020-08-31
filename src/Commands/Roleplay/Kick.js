const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['kicks'],
            description: 'Roleplaying.',
            category: 'Roleplay'
        });
    }

    async run(message, args) {

        let gifs = [
            `https://cdn.discordapp.com/attachments/741841441797701674/741859766816604160/8.gif`,
            `https://cdn.discordapp.com/attachments/741841441797701674/741859759367651358/7.gif`,
            `https://cdn.discordapp.com/attachments/741841441797701674/741859747304833074/6.gif`,
            `https://cdn.discordapp.com/attachments/741841441797701674/741859739524137040/5.gif`,
            `https://cdn.discordapp.com/attachments/741841441797701674/741859728963141782/4.gif`,
            `https://cdn.discordapp.com/attachments/741841441797701674/741859722491199488/3.gif`,
            `https://cdn.discordapp.com/attachments/741841441797701674/741859710503878776/2.gif`,
            `https://cdn.discordapp.com/attachments/741841441797701674/741859701595045918/1.gif`
        ];
        let pick = gifs[Math.floor(Math.random() * gifs.length)];

        const reason = args.join(" ");

        const embed = new MessageEmbed()

        embed.setImage(pick)
        embed.setColor(message.guild.me.displayHexColor || 'RANDOM')
        embed.setDescription(`${message.author} kicks ${reason ? ` ${reason}` : ""}`)
        return message.channel.send(embed);
    }

};
