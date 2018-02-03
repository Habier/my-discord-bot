reddit = require('redwrap');
let subs = [
  'Meow_Irl', 'Cats', 'CatReactionGifs',
  'CatSpotting', 'CatGifs', 'CatPics',
  'CatReddit', 'KittenGifs',
  'Kitten', 'Kittens', 'Kitties',
  'LookAtMyCat', 'Cat', 'Kitty',
  'CatPictures'
];
//'CatVideos', seems to be private
let subsCount = subs.length;


///Function that makes the command functional.
exports.exe = function(args, message) {

  var sub = subs[Math.floor(Math.random() * subsCount)];
  let msg = "(╯°□°）╯︵ ┻━┻"; //default message showing my thoughts.
  reddit.r(sub).sort('new').limit(100, function(err, data, res) {

    if (err) {
      message.channel.send("uy reddit ha petado");
      return;
    } else if (data.data !== undefined) {

      var items = data.data.children;
      var item = items[Math.floor(Math.random() * items.length)];

      msg = item.data.url;
    }

    message.channel.send(msg)

  });

}

///String to explain the command
exports.man = function() {
  return "Fotos de gatos al azar. Hanyyyaaaaaa";
}