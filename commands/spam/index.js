var Database = require('better-sqlite3');
let db = new Database('./private/discordBot.db');


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

  let club_id = getClubId(db, args[1]);
  if (!club_id) {
    msg = "¡Ese club no existe!"
  } else if (isInClub(db, club_id, message.author.id)) {
    let stmt = db.prepare("SELECT * FROM club_members WHERE club_id=?");
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

function isInClub(db, club_id, user_id) {
  let already = false;
  let stmt = db.prepare("SELECT * FROM club_members WHERE club_id=? AND user_id=?");
  let rows = stmt.all(club_id, user_id);
  if (rows.length > 0)
    already = true;

  return already;
}

function add2club(db, club_id, user_id) {


  if (!isInClub(db, club_id, user_id)) {
    stmt = db.prepare("INSERT INTO club_members (club_id, user_id) VALUES (?, ?)");
    stmt.run(club_id, user_id);
  }

  return already;
}

function getClubId(db, name) {
  let club_id = false;
  let stmt = db.prepare("SELECT * FROM clubs WHERE name=?");
  let rows = stmt.all(name);

  if (rows.length > 0) {
    club_id = rows[0].id;
  }
  return club_id;
}