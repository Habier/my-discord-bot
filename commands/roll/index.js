var Roll = require('roll'),
  roll = new Roll();

///Function that makes the command functional.
exports.exe = function(args, message) {
  var msg = "";

  if (args.length == 1) {
    msg = roll.roll('d20').result;
  } else {
    let res = roll.roll(args[1]);
    msg = res.result;
  }
  message.channel.send(msg);

}

///String to explain the command
exports.man = function() {
  return "Tira un d20 o los dados indicados";
}