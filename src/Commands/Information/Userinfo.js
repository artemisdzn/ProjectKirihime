const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const flags = {
	DISCORD_EMPLOYEE: '<:staff:745459518900797491> Discord Employee',
	DISCORD_PARTNER: '<:partner:745459518867112098> Discord Partner',
	BUGHUNTER_LEVEL_1: '<:bughunter:745459518309269545> Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: '<:BugHunterLvl2:745464164407050350> Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: '<:hypesquad:745459518909186109> HypeSquad Events',
	HOUSE_BRAVERY: '<:bravery:745459518250549309> House of Bravery',
	HOUSE_BRILLIANCE: '<:brilliance:745459518506401883> House of Brilliance',
	HOUSE_BALANCE: '<:balance:745459518346887249> House of Balance',
	EARLY_SUPPORTER: '<:earlysupporter:745459518560796723> Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	VERIFIED_DEVELOPER: '<:verified:710970919736311942> Verified Bot Developer'
};

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['user', 'ui'],
			description: 'Displays information about a provided user or the message author.',
			category: 'Information',
			usage: '[user]'
		});
	}

	async run(message, [target]) {
		const member = message.mentions.members.last() || message.guild.members.cache.get(target) || message.member;
		const roles = member.roles.cache
			.sort((a, b) => b.position - a.position)
			.map(role => role.toString())
			.slice(0, -1);
		const userFlags = member.user.flags.toArray();
		const embed = new MessageEmbed()
			.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
			.setColor(message.guild.me.displayHexColor || 'RANDOM')
			.addField('User Information', [
				`> Username: ${member.user.username}`,
				`> Discriminator: ${member.user.discriminator}`,
				`> ID: ${member.id}`,
				`> Flags: ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`,
				`> Avatar: [Link to avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
				`> Time Created: ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`,
				`> Status: ${member.user.presence.status}`,
				`> Game: ${member.user.presence.game || 'Not playing a game.'}`,
				`\u200b`
			])
			.addField('Member', [
				`> Highest Role: ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`,
				`> Server Join Date: ${moment(member.joinedAt).format('LL LTS')}`,
				`> Hoist Role: ${member.roles.hoist ? member.roles.hoist.name : 'None'}`,
				`> Roles [${roles.length}]: ${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None'}`,
				`\u200b`
			])
			.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp()
		return message.channel.send(embed);
	}

};
