let masters = require('../private/masters.json');

exports.isMaster = function(id) {
  for (let value of masters) {
    if (id == value)
      return true;
  }
  console.log('fail')
  return false;

}