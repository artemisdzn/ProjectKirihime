const Command = require('../../Structures/Command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ["roleremove", "rrole", "takerole"],
            description: 'Removes a role from a someone. You must have manage roles to use this command!',
            usage: '<@user> <rolename|role id>',
            category: 'Moderation'
        });
    }

    async run(message, [member, ...rolename]) {

        member = await this.verifyMember(message, member);

        if (!message.guild.member(message.author).hasPermission('MANAGE_ROLES')) return message.channel.send('You do not have permission to do this!');

        if (message.guild.member(message.author).hasPermission('MANAGE_ROLES')) {

            rolename = rolename.join(" ");
            if (!rolename) return message.channel.send("You must provide the name or ID of the role you want to add.");

            // TODO: Add some role helper.
            const role = message.guild.roles.cache.find(r => (r.id === rolename) || (r.name.toLowerCase() === rolename.toLowerCase()));
            if (!role) return message.channel.send("That role does not exist!");
            if (member.roles.cache.has(role.id)) return message.channel.send("The user does not have that role!");

            if (role.position > message.member.roles.highest.position) return message.channel.send("You cannot remove that role.");
            if (role.position > message.guild.me.roles.highest.position) return message.channel.send("I can't remove that role.");

            await member.roles.remove(role);

            return message.channel.send(`Removed \`${role.name}\` to ${member.user.tag}`);
        }

    }

};
