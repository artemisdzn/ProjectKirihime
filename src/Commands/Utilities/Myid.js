const Command = require('../../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Retrieve your User ID.',
			category: 'Utilities'
		});
	}

	async run(message) {
		return message.channel.send(`Your User ID is: \`${message.author.id}\``);
	}

};
