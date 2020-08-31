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
	database: 'sitepoint',
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

con.query ('SELECT * FROM authors', (err, rows) => {
  if (err) throw err;

  console.log ('Data received from Db:');
  console.log (rows);
});

con.query ('SELECT 12 + 34 As result', (err, rows) => {
  if (err) throw err;

	console.log ('The result is: ', rows[0].result);
});

con.end ();