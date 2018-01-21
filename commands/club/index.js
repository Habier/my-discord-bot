let Club = require('../../Services/ClubServices');

///String to explain the command
exports.man = function() {
  return "Añade al usuario y crea el club si no existe"
}

///Function that makes the command functional.
exports.exe = function(args, message) {
  let msg = "";

  if (args.length < 2) {
    //show proper usage
    let clubs = Club.getallClubs().map(function(a) {
      return a.name;
    });
    msg = "Hay " + clubs.length + " clubs\n" + clubs.join(', ');
    message.channel.send(msg);
    return;
  }

  let club_id = Club.getClubId(args[1]);
  if (!club_id) {
    Club.createClub(args[1]);
    club_id = Club.getClubId(args[1]);
    msg = "Club " + args[1] + " creado y " + message.author.username + " añadido."
  }

  if (Club.add2club(club_id, message.author.id))
    msg = "Pero si ya estabas apuntado... (ლ‸－)";
  else
    msg = "Bienvenido al club " + args[1] + " " + message.author.username;
  message.channel.send(msg);
}