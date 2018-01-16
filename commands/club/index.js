var Database = require('better-sqlite3');
let db = new Database('./private/discordBot.db');


///String to explain the command
exports.man = function() {
  return "Añade al usuario y crea el club si no existe"
}

///Function that makes the command functional.
exports.exe = function(args, message) {
  let msg = "";

  if (args.length < 2) {
    //show proper usage
    let clubs = getallClubs().map(function(a) {return a.name;});
    msg = "Hay " + clubs.length + " clubs\n" + clubs.join(', ');
    message.channel.send(msg);
    return;
  }

  let club_id = getClubId(args[1]);
  if (!club_id) {
    createClub(args[1]);
    club_id = getClubId(args[1]);
    msg = "Club " + args[1] + " creado y " + message.author.username + " añadido."
  }

  if (add2club(club_id, message.author.id))
    msg = "Pero si ya estabas apuntado... (ლ‸－)";
  else
    msg = "Bienvenido al club " + args[1] + " " + message.author.username;
  message.channel.send(msg);
}

function add2club(club_id, user_id) {
  let already = false;
  let stmt = db.prepare("SELECT * FROM club_members WHERE club_id=? AND user_id=?");
  let rows = stmt.all(club_id, user_id);

  if (rows.length > 0)
    already = true;

  if (!already) {
    stmt = db.prepare("INSERT INTO club_members (club_id, user_id) VALUES (?, ?)");
    stmt.run(club_id, user_id);
  }

  return already;
}

function createClub(name) {
  let stmt = db.prepare("INSERT INTO clubs (name) VALUES (?)");
  stmt.run(name);

}

function getClubId(name) {
  let club_id = false;
  let stmt = db.prepare("SELECT * FROM clubs WHERE name=?");
  let rows = stmt.all(name);

  if (rows.length > 0) {
    club_id = rows[0].id;
  }
  return club_id;
}

function getallClubs() {

  let stmt = db.prepare("SELECT name FROM clubs");
  let rows = stmt.all();

  return rows;
}