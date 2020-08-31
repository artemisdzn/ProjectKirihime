module.exports = class Command {

  constructor(client, name, options = {}) {
    this.client = client;
    this.name = options.name || name;
    this.aliases = options.aliases || [];
    this.description = options.description || 'No description provided.';
    this.category = options.category || 'Miscellaneous';
    this.usage = `${this.client.prefix}${this.name} ${options.usage || ''}`.trim()
    this.extras = options.extras || 'No extra features.';
  }

  /**
  * Verifies that a user is given.
  */
  async verifyUser(message, user, defaultToAuthor = false) {
    if (!user && defaultToAuthor) return message.author;
    const match = /^(?:<@!?)?(\d{17,19})>?$/.exec(user);
    if (!match) return;
    user = await this.client.users.fetch(match[1]).catch(() => null);
    // We will assume they gave IDs as mentions are highly unlikely to fail.
    if (!user) return "I couldn't find that user! Make sure the ID is correct.";
    return user;
  }

  /**
   * Verifies that a member is given.
   */
  async verifyMember(message, member, defaultToAuthor = false) {
    const user = await this.verifyUser(message, member, defaultToAuthor);
    return message.guild.members.fetch(user);
  }

  async verifyChannel(message, channel, defaultToCurrent = false) {
    if (!channel && defaultToCurrent) return message.channel;
    if (!channel) return;

    const match = /^(?:<#)?(\d{17,19})>?$/.exec(channel);
    if (!match) return;

    const chan = await this.client.channels.fetch(match[1]).catch(() => null);
    if (!chan) return;

    return chan;
  }

  // eslint-disable-next-line no-unused-vars
  async run(message, args) {
    throw new Error(`Command ${this.name} doesn't provide a run method!`);
  }

};