var Database = require('better-sqlite3');
let db = new Database('./private/discordBot.db');

function isInClub(club_id, user_id) {
  let already = false;
  let stmt = db.prepare("SELECT * FROM club_members WHERE club_id=? AND user_id=?");
  let rows = stmt.all(club_id, user_id);
  if (rows.length > 0)
    already = true;

  return already;
}
exports.isInClub = isInClub;

function add2club(club_id, user_id) {
  if (!isInClub(club_id, user_id)) {
    stmt = db.prepare("INSERT INTO club_members (club_id, user_id) VALUES (?, ?)");
    stmt.run(club_id, user_id);
  }

  return already;
}
exports.add2club = add2club;

function getClubId(db, name) {
  let club_id = false;
  let stmt = db.prepare("SELECT * FROM clubs WHERE name=?");
  let rows = stmt.all(name);

  if (rows.length > 0) {
    club_id = rows[0].id;
  }
  return club_id;
}
exports.getClubId = getClubId;

function createClub(name) {
  let stmt = db.prepare("INSERT INTO clubs (name) VALUES (?)");
  stmt.run(name);

}
exports.createClub = createClub;

function getallClubs() {

  let stmt = db.prepare("SELECT name FROM clubs");
  let rows = stmt.all();

  return rows;
}
exports.getallClubs = getallClubs;