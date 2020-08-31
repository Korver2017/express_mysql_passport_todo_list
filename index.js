let express = require ('express');
let app = express ();
var path = require ('path');
var mysql = require ('mysql');

app.get ('/', function (req, res) {
  res.send ('Hello World!');
});

app.listen (3000, function () {
  console.log ('Example app listening on port 3000!');
});

var con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'demo_nodejs',
	port: 3306
});

con.connect (function (err) {

  if (err) {
		console.log ('connecting error');
		console.log (err);
    return;
  }

  console.log ('connecting success');
});

con.end ();

app.use (express.static (path.join (__dirname, 'public')));

// DB state
app.use (function (req, res, next) {
  req.con = con;
  next();
});