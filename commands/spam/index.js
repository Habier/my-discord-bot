let Club = require('../../Services/ClubServices');


///String to explain the command
exports.man = function() {
  return "Envia privados a todos los usuarios del club."
}

///Function that makes the command functional.
exports.exe = function(args, message) {
  var msg = "";

  if (args.length < 3) {
    //show proper usage
    msg = "ò_ó ¡Vamos a ver!\ncomando club todo_tu_mensaje";
    message.channel.send(msg);
    return;
  }

  let club_id = Club.getClubId(args[1]);
  if (!club_id) {
    msg = "¡Ese club no existe!"
  } else if (Club.isInClub(club_id, message.author.id)) {
    let stmt = Club.prepare("SELECT * FROM club_members WHERE club_id=?");
    let rows = stmt.all(club_id);
    let phrase = args.slice(2).join(' ');
    for (let row of rows) {
      let tmpUser = bot.users.get(row.user_id);
      tmpUser.send(phrase);
    }
  } else {
    msg = "No estás en ese club :D";
  }

  message.channel.send(msg);
}