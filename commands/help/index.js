var Commands = require('../../commands');

///Function that makes the command functional.
exports.exe = function(args, message) {

  var msg = "";

  for (var key in Commands.commands) {

    var manText = Commands.commands[key].man();

    if (manText) //command could be hidden
      msg += conf.character + key + "\t" + Commands.commands[key].man() + "\n";

  }
  message.author.send(msg);
}

///String to explain the command
exports.man = function() {
  return "Comando de ayuda";
}