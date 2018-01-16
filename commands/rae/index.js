///Function that makes the command functional.
exports.exe = function(args, message) {
  var msg = "";

  if (args.length > 1)
    msg = "http://dle.rae.es?w=" + args[1];
  else
    msg = "¿Qué dices que busque?"

  message.channel.send(msg);

}

///String to explain the command
exports.man = function() {
  return "Busca palabra en el diccionario: !rae PALABRA";
}

//http://dle.rae.es?w=pera