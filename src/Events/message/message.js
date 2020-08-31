const Event = require('../../Structures/Event');
const { MessageEmbed, Permissions } = require('discord.js');

module.exports = class extends Event {
	constructor(...args) {
		super(...args);
		this.friendlyPerms = Object.keys(Permissions.FLAGS).reduce((obj, key) => {
			obj[key] = this.client.utils.toProperCase(key.split("_").join(" "));
			return obj;
		}, {});
	}

	async run(message) {

		const mentionRegex = RegExp(`^<@!${this.client.user.id}>$`);
		const mentionRegexPrefix = RegExp(`^<@!${this.client.user.id}> `);

		if (!message.guild || message.author.bot) return;

		if (message.content.match(mentionRegex)) await message.delete().catch(() => null)

		if (message.content.match(mentionRegex)) message.channel.send(`My prefix for ${message.guild.name} is \`${this.client.prefix}\`.`).then(msg => msg.delete({ timeout: 5000 }));

		const prefix = message.content.match(mentionRegexPrefix) ?
			message.content.match(mentionRegexPrefix)[0] : this.client.prefix;

		if (message.content.startsWith(prefix)) message.channel.startTyping().then(message.channel.stopTyping());

		if (!message.content.startsWith(prefix)) return;

		// eslint-disable-next-line no-unused-vars
		const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);

		const command = this.client.commands.get(cmd.toLowerCase()) || this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));

		if (!command) await message.delete().catch(() => null)

		const embed = new MessageEmbed()
			.setAuthor(`${this.client.user.username}`, this.client.user.displayAvatarURL(), 'https://discord.gg/a2UdmhH')
			.setColor(message.guild.me.displayHexColor || 'RANDOM')
			.setTitle(`The Command Does Not Exist!`)
			.setFooter(`Bot developed by アルテミス#2780`, this.client.guilds.resolve('740450115202056192').members.resolve('278136676574953472').user.displayAvatarURL({ dynamic: true }))
			.setDescription([
				`[Invite Me](https://discord.com/oauth2/authorize?client_id=727057927596277821&scope=bot&permissions=2146958847) | [Community Server](https://discord.gg/fY3tnh7) | [Support Server](https://discord.gg/a2UdmhH) | [Hangout Server](https://discord.gg/ygxFdJP)`,
				`The following command does not exist, please do \`${this.client.prefix}help\` to view the command list!`
			]);

		if (!command) return message.channel.send(embed).then(msg => msg.delete({ timeout: 15000 }));

		if (command) {
			command.run(message, args);
		}
	}

	async checkPerms(msg, cmd) {
		if(msg.channel.type !== "text") return true; // No permissions in DMs.
	
		// Check if user has permissions to run the command. Owner gets a bypass.
		const user = msg.author.id === this.client.constants.ownerID ? [] :
		  msg.channel.permissionsFor(msg.author).missing(cmd.userPermissions);
	
		if(user.length > 0) {
		  await msg.channel.send(`You do not have the following permission${user.length === 1 ? "" : "s"} to run this command: \`${
			user.map((p) => this.friendlyPerms[p]).join(", ")}\``);
		  return false;
		}
	
		// Now check if the bot has the permissions to perform the intended action.
		const bot = msg.channel.permissionsFor(this.client.user).missing(cmd.botPermissions);
		if(bot.length > 0) {
		  await msg.channel.send(`Hey! I need the following permission${bot.length === 1 ? "" : "s"} to do that: \`${
			bot.map((p) => this.friendlyPerms[p]).join(", ")}\``);
		  return false;
		}
		
		return true;
	  }
}