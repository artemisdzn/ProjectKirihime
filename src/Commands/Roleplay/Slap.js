const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['slaps'],
            description: 'Roleplaying.',
            category: 'Roleplay'
        });
    }

    async run(message, args) {

        let gifs = [
            `https://cdn.discordapp.com/attachments/741841718546268161/741864427590123550/10.gif`,
            `https://cdn.discordapp.com/attachments/741841718546268161/741864388914315344/8.gif`,
            `https://cdn.discordapp.com/attachments/741841718546268161/741864376826593430/7.gif`,
            `https://cdn.discordapp.com/attachments/741841718546268161/741864368148578354/6.gif`,
            `https://cdn.discordapp.com/attachments/741841718546268161/741864354038808702/5.gif`,
            `https://cdn.discordapp.com/attachments/741841718546268161/741864345709051914/4.gif`,
            `https://cdn.discordapp.com/attachments/741841718546268161/741864334464122890/3.gif`,
            `https://cdn.discordapp.com/attachments/741841718546268161/741864309751152710/1.gif`
        ];
        let pick = gifs[Math.floor(Math.random() * gifs.length)];

        const reason = args.join(" ");

        const embed = new MessageEmbed()

        embed.setImage(pick)
        embed.setColor(message.guild.me.displayHexColor || 'RANDOM')
        embed.setDescription(`${message.author} slaps ${reason ? ` ${reason}` : ""}`)
        return message.channel.send(embed);
    }

};
