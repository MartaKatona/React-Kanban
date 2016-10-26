const express = require('express');
const app = express();
const cards = require('./routes/cards.js');
const CONFIG = require('./config/config.json');
const db = require('./models');
const User = db.User;

app.use(express.static('./public'));
app.use('/cards', cards);




app.listen(8080, function() {
  console.log('server started');
  db.sequelize.sync();
});
module.exports = app;