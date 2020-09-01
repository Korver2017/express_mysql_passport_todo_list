
var path = require ('path');
var mysql = require ('mysql');

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

con.end ();