const Command = require('../../Structures/Command');
const fetch = require("node-fetch");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ["chuck"],
            description: "Returns a chuck norris joke.",
            usage: "<@user>",
            category: 'Fun'
        });
    }

    async run(message, user) {

        if (user) user = await this.verifyUser(message, user);

        const { value } = await fetch("http://api.chucknorris.io/jokes/random")
            .then((res) => res.json());

        return message.channel.send(user ? value.replace(/Chuck Norris/g, user.toString()) : value);

    }
}