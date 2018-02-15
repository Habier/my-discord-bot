///Function that makes the command functional.
exports.exe = function(args, message) {
  if (!masters.isMaster(message.author.id))
    return;

  if (args.length > 1)
    bot.user.setActivity(args.slice(1).join(" "));
  else
    bot.user.setActivity(lang.bot_activity);

}

///String to explain the command
exports.man = function() {
  return "(Admin) Elige a que juega el bot";

  //  return false;
}