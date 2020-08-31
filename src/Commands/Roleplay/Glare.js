const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['glares'],
            description: 'Roleplaying.',
            category: 'Roleplay'
        });
    }

    async run(message, args) {

        let gifs = [
            `https://cdn.discordapp.com/attachments/741841233722474567/741857999072788511/Glare2.gif`,
            `https://cdn.discordapp.com/attachments/741841233722474567/741857993473130607/Glare1.gif`,
            `https://cdn.discordapp.com/attachments/741841233722474567/741857988133781595/Glare.gif`,
            `https://cdn.discordapp.com/attachments/741841233722474567/741857984249987193/Glare9.gif`,
            `https://cdn.discordapp.com/attachments/741841233722474567/741857974007496744/Glare8.gif`,
            `https://cdn.discordapp.com/attachments/741841233722474567/741857969179983912/Glare7.gif`,
            `https://cdn.discordapp.com/attachments/741841233722474567/741857961714122882/Glare6.gif`,
            `https://cdn.discordapp.com/attachments/741841233722474567/741857958417268846/Glare5.gif`,
            `https://cdn.discordapp.com/attachments/741841233722474567/741857952876462151/Glare4.gif`,
            `https://cdn.discordapp.com/attachments/741841233722474567/741857944899027004/Glare3.gif`
        ];
        let pick = gifs[Math.floor(Math.random() * gifs.length)];

        const reason = args.join(" ");

        const embed = new MessageEmbed()

        embed.setImage(pick)
        embed.setColor(message.guild.me.displayHexColor || 'RANDOM')
        embed.setDescription(`${message.author} glares ${reason ? ` ${reason}` : ""}`)
        return message.channel.send(embed);
    }

};
