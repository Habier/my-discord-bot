///Function that makes the command functional.
exports.exe = function(args, message) {
  if (!masters.isMaster(message.author.id))
    return;

  if (args.length > 1)
    bot.user.setActivity(args.slice(1).join(" "));
  else
    bot.user.setActivity("");

}

///String to explain the command
exports.man = function() {
  return "Fotos de gatos al azar. Hanyyyaaaaaa";

  //  return false;
}