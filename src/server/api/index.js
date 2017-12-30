var express = require('express');
var router = express.Router();
var moment = require('moment');

//  fs is for temp data, replace with db connection when setup
var fs = require('fs');
var path = require('path');

router.get('/schedule', function(req, res) {
  //  Insert Logic to figure out which schedule to serve

  //  Replace with database calls
  fs.readFile(path.join(__dirname,"./temp.json"), function (err, data) {
    if (err) {
      console.log(process.cwd());
    };
    //  Send Regular Schedule
    var obj = JSON.parse(data);
    res.send(JSON.stringify(obj.schedules[0]));
  });
});
module.exports = router;
