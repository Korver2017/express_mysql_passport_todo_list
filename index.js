let express = require ('express');
let app = express ();
let mysql = require ('mysql');
let cors = require ('cors');

app.use (cors ());

app.listen (3000, function () {
  console.log ('Example app listening on port 3000!');
});

app.use (express.json ());

var con = mysql.createConnection ({
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

app.get ('/', function (req, res) {

  con.query ('SELECT * FROM todo_list', (err, rows) => {

    if (err)
      throw err;

    console.log ('Data received from Db:');
    console.log (rows);

    let data = rows;

    res.send (data);
  });
});

app.post ('/remove', function (req, res) {

  console.log (req.body.todo_id);

  let id = req.body.todo_id;

  con.query (`DELETE FROM todo_list WHERE todo_id = '${id}'`, function (error, results, fields) {

      if (error)
        throw error;

      else 
        res.json ({error: false, data: results, message: 'Deleted successfully.'});
        // return res.send({ error: false, data: results, message: 'products delete.' });
  });
});

console.log ('End');