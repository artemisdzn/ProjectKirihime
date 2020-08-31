const Command = require('../../Structures/Command');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      aliases: ["nickname", "changenickname", "changenick", "setnick", "setnickname", "nick"],
      description: `Change someone's nick! must have manage nicknames to use this command.`,
      usage: "<you|me|@member> <nick>",
      category: 'Moderation'
    });

  }

  async run(message, [member, ...nick]) {

    if (!message.guild.member(message.author).hasPermission('MANAGE_NICKNAMES')) return message.channel.send('You do not have permission to do this!');

    if (member === "me") member = message.member;
    if (message.guild.ownerID) return message.channel.send("It seems like bots cannot overwrite the owner of the guild.");
    else if (member === "you") member = message.guild.me;
    else member = await this.verifyMember(message, member);

    if (message.guild.member(message.author).hasPermission('MANAGE_NICKNAMES')) {

      if (!nick.length) return message.channel.send("You didn't tell me what nickname to use.");
      nick = nick.join(" ");

      if (nick.length >= 32) return message.channel.send("Nickname must be less than 32 characters.");
      if (member.roles.highest.position > message.guild.me.roles.highest.position)
        return message.channel.send("I can't edit nicknames of people with higher role than mine.");

      await member.edit({ nick });
      return message.channel.send(`Set ${member === message.guild.me ? "my" : member === message.member ? "your" : member.user.username}'s nickname to **${nick}**`);

    }
  }

};
