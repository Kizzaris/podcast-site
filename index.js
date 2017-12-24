const express = require('express')
const app = express()
const fs = require('fs');
const extend = require('extend');

app.use('/', express.static('public'))

app.use('/admin', express.static('admin'))
 
function readJSONFile(filename, callback) {
  fs.readFile(filename, function (err, data) {
    if(err) {
      callback(err);
      return;
    }
    try {
      callback(null, JSON.parse(data));
    } catch(exception) {
      callback(exception);
    }
  });
}

app.get('/api/info', function(req, res) {
  var latestEpisodes = ""
  var mehJson = "{}"
  readJSONFile('./test.json', function (err, json) {
    if(err) { console.log(err), res.send(err); }
    console.log(json);
      readJSONFile('./data/newEpisodes.json', function (err, mehJson) {
        if(err) { console.log(err), res.send(err); }
        console.log(mehJson);
        res.send(extend(json,mehJson))
      });    
  });
});

app.get('/api/episodeInfo/:episodeID', function(req, res) {
  readJSONFile('./data/' + req.params.episodeID + '/episode.json', function (err, json) {
    if(err) { console.log(err), res.send(json); }
    console.log(json);
    res.send(json);
  });
});

app.listen(3000, () => console.log('Listening on port 3000!'))