const Command = require('../../Structures/Command');
const { MessageEmbed } = require("discord.js")

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ["q"],
            description: 'Displays the music queue in the guild.',
            category: 'Music'
        });
    }

    async run(message) {

        this.client.music.on('nodeConnect', () => console.log('New Node Connected.'))

        const player = this.client.music.players.get(message.guild.id);
        if (!player || !player.queue[0]) return message.channel.send("No song currently playing in this guild.");

        let index = 1;
        let string = "";

        if (player.queue[0]) string += `**Now Playing**\n ${player.queue[0].title} - \`Requested by ${player.queue[0].requester.username}\` \n`;
        if (player.queue[1]) string += `__**Rest of queue**__\n ${player.queue.slice(1, 10).map(x => `${index++} ${x.title} - \`Requested by ${x.requester.username}\``).join("\n")}`;

        const embed = new MessageEmbed()
            .setTitle(`Music Queue for ${message.guild.name}`, message.guild.iconURL)
            .setThumbnail(player.queue[0].thumbnail)
            .setDescription(string)
            .setColor(message.channel.guild.me.displayHexColor || 'RANDOM')
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

        return message.channel.send(embed);

    }
}