const Command = require('../../Structures/Command');
const fetch = require("node-fetch");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['hb'],
            description: `Upload some code to hastebin.`,
            category: 'Utilities',
            usage: '<code>'
        });
    }

    async run(message, args) {

        if (!args.length) return message.reply("What do you wan me to upload?").then(msg => msg.delete({ timeout: 15000 }))

        const { code, lang } = this.client.utils.getCodeBlock(args.join(" "));

        const { key } = await fetch('https://hastebin.com/documents', {
            method: 'POST',
            body: code
        })
            .then((res) => {
                if (!res.ok) return message.reply(`Something went wrong with Hastebin. Try again later. (Status: ${res.status} ${res.statusText})`).then(msg => msg.delete({ timeout: 15000 }))
                return res.json()
            });

        return message.reply(`Hastebin: https://hastebin.com/${key}${lang ? `.${lang}` : ""}`).then(msg => msg.delete({ timeout: 30000 }))

    }

};
