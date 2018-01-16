var Roll = require('roll'),
  roll = new Roll();

///Function that makes the command functional.
exports.exe = function(args, message) {
  var msg = "";

  var res = roll.roll(args[1]);
  msg = res.result;

  message.channel.send(msg);

}

///String to explain the command
exports.man = function() {
  return "Tira unos dadasos";
}