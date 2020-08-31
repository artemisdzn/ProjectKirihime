const { MessageEmbed, version: djsversion } = require('discord.js');
const { version } = require('../../../package.json');
const Command = require('../../Structures/Command');
const { utc } = require('moment');
const os = require('os');
const ms = require('ms');


module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['info', 'bot'],
            description: 'Displays information about the bot.',
            category: 'Information'
        });
    }

    run(message) {

        const embed = new MessageEmbed()
            .setThumbnail(this.client.user.displayAvatarURL())
            .setColor(message.guild.me.displayHexColor || 'RANDOM')
            .setTitle(`${this.client.user.username} Information`)
            .setDescription([
                `[Invite Me](https://discord.com/oauth2/authorize?client_id=727057927596277821&scope=bot&permissions=2146958847) | [Community Server](https://discord.gg/fY3tnh7) | [Support Server](https://discord.gg/a2UdmhH) | [Hangout Server](https://discord.gg/ygxFdJP)`,
                `Hi, I'm ${this.client.user.username}. I will be in your service in ${message.guild.name} brought by my master アルテミス#2780`,
                `[Vote Me!](https://top.gg/bot/727057927596277821/vote)`
            ])
            .addField('**Bot Status**', [
                `> Commands: ${this.client.commands.size}`,
                `> Servers: ${this.client.guilds.cache.size.toLocaleString()}`,
                `> Users: ${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`,
                `> Channels: ${this.client.channels.cache.size.toLocaleString()}`,
                `> Uptime: ${ms(os.uptime() * 1000, { long: true })}`
            ])
            .addField('Memory', [
                `> Total: ${this.client.utils.formatBytes(process.memoryUsage().heapTotal)}`,
                `> Used: ${this.client.utils.formatBytes(process.memoryUsage().heapUsed)}`,
            ])
            .addField('Versions', [
                `> Node.js: ${process, version}`,
                `> Discord.js: ${djsversion}`
            ])
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()

        message.channel.send(embed);
    }

};
