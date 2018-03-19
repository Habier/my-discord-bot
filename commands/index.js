///*************************************************************************///
///This is a loader
///It will look for an index.js inside every folder of the 'commands' folder
///Note: the command will be !folder_name so remember to name the folders :D
///*************************************************************************///

var glob = require('glob');
var path = require('path');

exports.commands = [];
var commandsCount = 0;

glob.sync('./commands/*/index.js').forEach(function(file) {
  var commandName = file.split('/')[2]
  logger.info('Found ' + conf.character + commandName);
  commandsCount++;
  exports.commands[commandName] = require(path.resolve(file));
});

logger.info('Total of commands found: ' + commandsCount);

exports.execute = function(args, message) {
  var cmd = args[0];
  //args = args.splice(1);

  for (var key in exports.commands) {
    if (key == cmd) {

      try {
        exports.commands[cmd].exe(args, message);
      } catch (error) {
        logger.error('Command: ' + cmd + ' has failed. Showing error:\n' + error);
        message.channel.send('¡Oooops! ' + message.author.username + ' tu comando ha fallado.');

      }
      return true; //stops the loop and tells that there was a match.
    }
  }
  return false //indicates that there wasn't a matching command.
}