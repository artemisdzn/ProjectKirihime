const Command = require('../../Structures/Command');
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ["npmpackage", "npmpkg", "nodepackagemanager"],
            description: "Search the NPM Registry for a package information.",
            category: 'Programming',
            usage: '<package>'
        });
    }

    async run(message, [pkg]) {

        if (!pkg) return message.channel.send(`\`${this.client.commands.get(this.name).usage}\``);

        const body = await fetch(`https://registry.npmjs.com/${pkg}`)
            .then((res) => {
                if (res.status === 404) throw "";
                return res.json();
            }).catch(() => { throw message.channel.send('No results found') });

        const version = body.versions[body["dist-tags"].latest];

        let deps = version.dependencies ? Object.keys(version.dependencies) : null;
        let maintainers = body.maintainers.map((user) => user.name);

        if (maintainers.length > 10) {
            const len = maintainers.length - 10;
            maintainers = maintainers.slice(0, 10);
            maintainers.push(`...${len} more.`);
        }

        if (deps && deps.length > 10) {
            const len = deps.length - 10;
            deps = deps.slice(0, 10);
            deps.push(`...${len} more.`);
        }

        const embed = new MessageEmbed()
            .setColor(message.guild.me.displayHexColor || 'RANDOM')
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setTitle(`NPM | ${pkg}`)
            .setURL(`https://npmjs.com/package/${pkg}`)
            .setDescription([
                body.description || "No Description.",
                `**Version:** ${body["dist-tags"].latest}`,
                `**License:** ${body.license}`,
                `**Author:** ${body.author ? body.author.name : "Unknown"}`,
                `**Modified:** ${new Date(body.time.modified).toDateString()}`,
                `**Dependencies:** ${deps && deps.length ? deps.join(", ") : "None"}`
            ].join("\n"));

        return message.channel.send({ embed });

    }

};
