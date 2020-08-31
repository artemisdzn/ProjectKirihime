const Command = require('../../Structures/Command');
const fetch = require("node-fetch");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['hb'],
            description: `Upload some code to hastebin.`,
            category: 'Programming',
            usage: '<code>'
        });
    }

    async run(message, args) {

        if (!args.length) return message.reply(`\`${this.client.commands.get(this.name).usage}\``);

        const { code, lang } = this.client.utils.getCodeBlock(args.join(" "));

        const { key } = await fetch('https://hastebin.com/documents', {
            method: 'POST',
            body: code
        })
            .then((res) => {
                if (!res.ok) return message.reply(`Something went wrong with Hastebin. Try again later. (Status: ${res.status} ${res.statusText})`);
                return res.json()
            });

        return message.channel.send(`Hastebin: https://hastebin.com/${key}${lang ? `.${lang}` : ""}`);

    }

};
