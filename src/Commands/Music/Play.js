const Command = require('../../Structures/Command');
const { Utils } = require('erela.js');
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['p'],
            description: 'Play a song/playlist or search a song from youtube.',
            category: 'Music'
        });
    }

    async run(message, args) {

        this.client.music.on('nodeConnect', () => console.log('New Node Connected.'))

        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.channel.send('You need to be in a voice channel to play music!');

        const permissions = voiceChannel.permissionsFor(this.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('I cannot connect to your voice channel, make sure I have permission!');
        if (!permissions.has('CONNECT')) return message.channel.send('I cannot connect to your voice channel, make sure I have permission!');

        if (!args[0]) return message.channel.send('Please provide a song name or link to search!');

        const player = this.client.music.players.spawn({
            guild: message.guild,
            textChannel: message.channel,
            voiceChannel
        });

        this.client.music.search(args.join(" "), message.author).then(async res => {
            switch (res.loadType) {
                case "TRACK_LOADED":
                    player.queue.add(res.tracks[0]);
                    message.channel.send(`Enqueuing \`${res.tracks[0].title}\` \`${Utils.formatTime(res.tracks[0].duration, true)}\``)
                    if (!player.playing) player.play()
                    break;

                case "SEARCH_RESULT":
                    let index = 1;
                    const tracks = res.tracks.slice(0, 5);
                    const embed = new MessageEmbed()
                        .setThumbnail(this.client.user.displayAvatarURL())
                        .setDescription(tracks.map(video => `${index++} - ${video.title}`))
                        .setColor(message.channel.guild.me.displayHexColor || 'RANDOM')
                        .setFooter(`Requested by ${message.author.username} | Type "cancel" to cancel the selection.`, message.author.displayAvatarURL({ dynamic: true }))
                        .setTimestamp();

                    await message.channel.send(embed);

                    const collector = message.channel.createMessageCollector(m => {
                        return m.author.id === message.author.id && new RegExp(`^([1-5]|cancel)$`, "i").test(m.content)
                    }, { time: 30000, max: 1 });

                    collector.on("collect", m => {
                        if (/cancel/i.test(m.content)) return collector.stop("cancelled");

                        const track = tracks[Number(m.content) - 1];
                        player.queue.add(track)
                        message.channel.send(`Enqueuing \`${track.title}\` \`${Utils.formatTime(track.duration, true)}\``)
                        if (!player.playing) player.play();
                    });

                    collector.on("end", (_, reason) => {
                        if (["time", "cancelled"].includes(reason)) return message.channel.send("Cancelled selection.");
                    });
                    break;

                case "PLAYLIST_LOADED":
                    res.playlist.tracks.forEach(track => player.queue.add(track));
                    const duration = Utils.formatTime(res.playlist.tracks.reduce((acc, cur) => ({ duration: acc.duration + cur.duration })).duration, true);
                    message.reply(`Enqueuing \`${res.playlist.tracks.length}\` \`${duration}\` tracks in playlist \`${res.playlist.info.name}\``)
                    if (!player.playing) player.play()
                    break;

            }

        }).catch(err => console.log(err.message))
    }
}