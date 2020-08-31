const Command = require('../../Structures/Command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['vol', 'v'],
            description: 'Adjusts the volume of the bot in this guild.',
            category: 'Music',
            usage: '<1-100>'
        });
    }

    async run(message, args) {

        this.client.music.on('nodeConnect', () => console.log('New Node Connected.'))

        const player = this.client.music.players.get(message.guild.id);
        if (!player) return message.channel.send("No song/s currently playing in this guild.");
        if (!args[0]) return message.channel.send(`Current Volume: ${player.volume}`)
        if (Number(args[0]) <= 0 || Number(args[0]) > 100) return message.reply('You may only set the volume 1-100');
        
        player.setVolume(Number(args[0]));
        return message.channel.send(`Succesfully set the volume to: \`${args[0]}\`.`);

    }
}