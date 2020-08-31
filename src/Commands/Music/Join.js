const Command = require('../../Structures/Command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['summon'],
            description: 'summon the bot to the voice channel you are in.',
            category: 'Music'
        });
    }

    async run(message) {

        this.client.music.on('nodeConnect', () => console.log('New Node Connected.'))

        const voiceChannel = message.member.voice.channel;
        if (voiceChannel) {
            this.client.music.players.spawn({
                guild: message.guild,
                textChannel: message.channel,
                voiceChannel
            });
            message.channel.send('Successfully joined the voice channel!');
        } else {
            message.channel.send('You need to be in a voice channel to use the join command.');
        }

    }
}