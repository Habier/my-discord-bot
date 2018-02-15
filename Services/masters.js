let master = require('../private/master.json');

exports.isMaster= function(id) {
  if (id ==  master.id)
    return true;

  return false;
}