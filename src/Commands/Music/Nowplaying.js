const Command = require('../../Structures/Command');
const { Utils } = require("erela.js")
const { MessageEmbed } = require("discord.js")
const { stripIndents } = require("common-tags")

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ["np", "now"],
            description: 'Displays what the bot is currently playing.',
            category: 'Music'
        });
    }

    async run(message) {

        this.client.music.on('nodeConnect', () => console.log('New Node Connected.'))

        const player = this.client.music.players.get(message.guild.id);
        if (!player || !player.queue[0]) return message.reply("No song/s currently playing within this guild.").then(m => m.delete(15000));
        const { title, author, duration, uri, thumbnail } = player.queue[0];

        const embed = new MessageEmbed()
            .setColor(message.channel.guild.me.displayHexColor || 'RANDOM')
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setTitle("Now Playing")
            .setThumbnail(thumbnail)
            .setDescription(stripIndents`
            ${player.playing ? "▶️" : "⏸️"} [${title}](${uri}) \`${Utils.formatTime(duration, true)}\` by ${author}
            `);

        return message.channel.send(embed);

    }
}