let express = require ('express');
let app = express ();
var wiki = require('./routes/wiki.js');

app.listen (3000, function () {
  console.log ('Example app listening on port 3000!');
});

app.use('/wiki', wiki);

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function (req, res) {
  
  
  res.render('index', { title: 'Hey', message: 'Hello there!' });
});