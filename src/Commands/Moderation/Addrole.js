const Command = require('../../Structures/Command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ["arole", "roleadd", "giverole"],
            description: 'Adds a role to someone. You must have manage roles to use this command!',
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
            if (member.roles.cache.has(role.id)) return message.channel.send("The user already has that role!");

            if (role.position > message.member.roles.highest.position) return message.channel.send("You cannot add that role.");
            if (role.position > message.guild.me.roles.highest.position) return message.channel.send("I can't add that role.");

            await member.roles.add(role);

            return message.channel.send(`Added \`${role.name}\` to ${member.user.tag}`);
        }

    }

};
