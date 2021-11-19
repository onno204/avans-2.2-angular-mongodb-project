//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/avans-app'));

app.get('/*', function(req,res) {

  res.sendFile(path.join(__dirname+'/dist/avans-app/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080, function () {
  console.log("Running AngularAPP on http://127.0.0.1:" + (process.env.PORT || 4200));
});
