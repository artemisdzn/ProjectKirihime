const Event = require('../Structures/Event')
const { MessageEmbed } = require("discord.js")
const os = require('os');
const ms = require('ms');

//Music Commands
const { ErelaClient, Utils } = require('erela.js');
const { nodes } = require('../../config.json');

// Heroku Pinger
const http = require('http'); //importing http

//Top.gg API
const dblToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyNzA1NzkyNzU5NjI3NzgyMSIsImJvdCI6dHJ1ZSwiaWF0IjoxNTk2OTQ2NjE4fQ.NADtyOiRj24KQINeKuJ-w6CbjLwpHEfsAJevY0BivvA";
const DBL = require('dblapi.js');
const dbl = new DBL(dblToken, this.client);

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            once: true
        });

    }

    run() {

        this.client.music = new ErelaClient(this.client, nodes)
            .on('nodeError', () => console.log('Node Error.'))
            .on('nodeReconnect', () => console.log('Reconnected to Node.'))
            .on('queueEnd', player => {
                player.textChannel.send('Queue has ended.');
                return this.client.music.players.destroy(player.guild.id)
            })
            .on('trackStart', ({ textChannel }, { title, duration }) => textChannel.send(`Now Playing: \`${title}\` \`${Utils.formatTime(duration, true)}\``));

        this.client.levels = new Map()
            .set('none', 0.0)
            .set('low', 0.10)
            .set('medium', 0.15)
            .set('high', 0.25);

        setInterval(() => {
            const options = nodes
            http.get(options, (res) => {
                res.on('data', (chunk) => {
                    try {
                        // optional logging... disable after it's working
                        console.log("HEROKU RESPONSE: " + chunk);
                    } catch (err) {
                        console.log(err.message);
                    }
                });
            }).on('error', (err) => {
                console.log("Error: " + err.message);
            });
        }, 1800000); // load every 30 minutes

        const mainGuild = this.client.guilds.cache.get("740450115202056192");

        const guildCount = this.client.guilds.cache.size.toLocaleString();
        const guildCountChannel = mainGuild.channels.cache.get("745824448862748814");
        const guildCountChannel1 = mainGuild.channels.cache.get("745857089720811540");
        guildCountChannel.setName(`Guilds: ${guildCount}`)
        guildCountChannel1.setName(`Users: ${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`)

        const guildArray = this.client.guilds.cache.array().join('\n');

        const guildCountChannel2 = mainGuild.channels.cache.get("745867289496256542");
        const list = new MessageEmbed()
            .setTitle(`List of Guilds Handled.`)
            .setDescription(`${guildArray}`)
            .setAuthor(`${this.client.user.username}`, this.client.user.displayAvatarURL(), 'https://discord.gg/a2UdmhH')
            .setColor(guildCountChannel2.guild.me.displayHexColor || 'RANDOM')
            .setThumbnail(this.client.user.displayAvatarURL())
            .setTimestamp();

        guildCountChannel2.send(list)

        const activities_list = [
            `${this.client.guilds.cache.size.toLocaleString()} guild\s`,
            `${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} user\s`,
            `${this.client.prefix}help | ${this.client.guilds.cache.size.toLocaleString()} guild\s`,
            `${this.client.prefix}vote | ${this.client.guilds.cache.size.toLocaleString()} guild\s`,
            `${this.client.commands.size} command\s`,
            `with Lux <3`,
            `${ms(os.uptime() * 1000, { long: true })} | ${this.client.guilds.cache.size.toLocaleString()} guild\s`,
            `${this.client.channels.cache.size.toLocaleString()} channel\s`,
            `${this.client.prefix}suggest | ${this.client.guilds.cache.size.toLocaleString()} guild\s`,
            `${this.client.prefix}report | ${this.client.guilds.cache.size.toLocaleString()} guild\s`,
            `${this.client.prefix}invite | ${this.client.guilds.cache.size.toLocaleString()} guild\s`,
            `${this.client.prefix}news | ${this.client.guilds.cache.size.toLocaleString()} guild\s`,
            `music | ${this.client.guilds.cache.size.toLocaleString()} guild\s`
        ];
        setInterval(() => {
            const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
            this.client.user.setActivity(activities_list[index], { type: 'STREAMING', url: 'https://www.twitch.tv/artemisdzn' }); // sets bot's activities to one of the phrases in the arraylist.
        }, 30000);

        setInterval(() => {

            dbl.postStats(this.client.guilds.cache.size);

            dbl.on("posted", () => {
                console.log('Server count posted!');
            })

            dbl.on("error", e => {
                console.log(`Oops! ${e}`);
            })

        }, 1800000);

        console.log([
            `${this.client.user.tag} is online on ${this.client.guilds.cache.size.toLocaleString()} guild\s`,
            `Logged in as ${this.client.user.tag}`,
            `Loaded ${this.client.commands.size} command\s`,
            `Loaded ${this.client.events.size} event\s`,
            `${this.client.guilds.cache.size.toLocaleString()} guild\s`,
            `${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} user\s`,

        ].join('\n'));

    }

}