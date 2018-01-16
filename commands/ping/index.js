///Function that makes the command functional.
exports.exe = function(args, message) {

  message.channel.send('¡Pero que dices!');

}

///String to explain the command
exports.man = function() {
  return "Bueno... Era el comando de ejemplo";
  //you can be evil and return false. So this command won't show.
}