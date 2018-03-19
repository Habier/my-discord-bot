let isMaster = require('../../Services/masters').isMaster;
///String to explain the command
exports.man = function() {
  return false;
  //return "descripción"
}

///Function that makes the command functional.
exports.exe = function(args, message) {
  if (!isMaster(message.author.id))
    return;

  if (args.length < 2) {
    //show proper usage
    msg = "ò_ó ¡Vamos a ver!\ncomando todo_tu_mensaje";
    message.channel.send(msg);
    return;
  }

  let phrase = args.slice(1).join(' ');

  let channel = bot.channels.find('name', conf.defaultChannel);
  if (!channel)
    return; //channel not found, better get out
  channel.send(phrase);
}