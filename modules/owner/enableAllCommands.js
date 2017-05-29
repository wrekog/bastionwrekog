/**
 * @file enableAllCommands command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license MIT
 */

exports.run = (Bastion, message) => {
  if (!Bastion.credentials.ownerId.includes(message.author.id)) return Bastion.log.info('User doesn\'t have permission to use this command.');

  Bastion.commands.filter(cmd => {
    cmd.config.enabled = true;
  });

  message.channel.send({
    embed: {
      color: Bastion.colors.red,
      description: `All commands have been disabled until next restart. You can enable all commands using \`${Bastion.config.prefix}enableAllCommands\`. Or you can enable any specific command using \`${Bastion.config.prefix}enableCommand <command_name>\`.`
    }
  }).catch(e => {
    Bastion.log.error(e.stack);
  });
};

exports.config = {
  aliases: [ 'enableallcmds' ],
  enabled: true
};

exports.help = {
  name: 'enableallcommands',
  description: 'Enables all temporarily disabled commands.',
  botPermission: '',
  userPermission: 'Bot Owner',
  usage: 'enableAllCommands',
  example: []
};
