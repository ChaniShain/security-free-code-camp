const express = require('express');
const helmet= require('helmet');


const app = express();


module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
// הסתרה שלא ידעו שמופעל ע"י express
app.use(helmet.hidePoweredBy());
// לא לאפשר לחיצה על קישורים
app.use(helmet.frameguard({ action: 'deny' }));
// לא לאפשר scripts
app.use(helmet.xssFilter());
// לא לאפשר לתת מידע על הכותרת שחוזרת 
app.use(helmet.noSniff());
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚬Your app is listening on port ${port}`);
});
