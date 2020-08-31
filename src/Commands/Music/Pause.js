const Command = require('../../Structures/Command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ["resume"],
            description: 'Makes the bot pause/resume the music currently playing.',
            category: 'Music'
        });
    }

    async run(message) {

        this.client.music.on('nodeConnect', () => console.log('New Node Connected.'))

        const player = this.client.music.players.get(message.guild.id);
        if (!player) return message.channel.send("No song/s currently playing in this guild.");

        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel || voiceChannel.id !== player.voiceChannel.id) return message.channel.send("You need to be in a voice channel to pause the music.");
        

        player.pause(player.playing);
        return message.channel.send(`Player is now ${player.playing ? "resumed" : "paused"}.`);

    }
}