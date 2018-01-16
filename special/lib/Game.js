class Player {
  constructor(user) {
    this.user = user;
  }

  send(msg) {
    this.user.send(msg);
  }
}

class Game {
  constructor(channel) {
    this.players = [];
    this.channel = channel;
  }

  send(msg) {
    this.channel.send(msg);
  }

  addPlayer(user) {
    if (!this.getPlayer(user.id)) {
      var p = new Player(user);
      this.players.push(p); /// does this associate? i hope so lol
      return p;
    }
    return false;
  }

  getPlayer(id) {
    for (var p in this.players) {
      if (this.players[p].user.id == id)
        return this.players[p];
    }
    return false; // player not found, not a player
  }

  send2All(msg) {
    this.players.forEach(function(p) {
      p.send(msg);
    });
  }

  shuffle() {
    var j;
    for (var i = this.players.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      [this.players[i], this.players[j]] = [this.players[j], this.players[i]];
    }
  }

  printablePlayerList() {
    var msg = '';
    for (var p in this.players) {
      msg+=p+'. '+this.players[p].user.username+'\n';
    }

    return msg;
  }
}

exports.Game = Game;