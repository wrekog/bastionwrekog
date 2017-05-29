/**
 * @file announce command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license MIT
 */

exports.run = (Bastion, message, args) => {
  if (!Bastion.credentials.ownerId.includes(message.author.id)) return Bastion.log.info('User doesn\'t have permission to use this command.');
  if (args.length < 1) {
    return message.channel.send({
      embed: {
        color: Bastion.colors.yellow,
        title: 'Usage',
        description: `\`${Bastion.config.prefix}${this.help.usage}\``
      }
    }).catch(e => {
      Bastion.log.error(e.stack);
    });
  }

  for (let i = 0; i < Bastion.guilds.size; i++) {
    Bastion.guilds.map(g => g.defaultChannel)[i].send({
      embed: {
        color: Bastion.colors.blue,
        description: args.join(' ')
      }
    }).catch(() => {});
  }

  message.channel.send({
    embed: {
      color: Bastion.colors.green,
      title: 'Announced',
      description: args.join(' ')
    }
  }).catch(e => {
    Bastion.log.error(e.stack);
  });
};

exports.config = {
  aliases: [ 'notify' ],
  enabled: true
};

exports.help = {
  name: 'announce',
  description: 'Sends a message to all servers\' default channel, the bot is connected to.',
  botPermission: '',
  userPermission: 'Bot Owner',
  usage: 'announce <message>',
  example: [ 'announce Just a random announcement.' ]
};
