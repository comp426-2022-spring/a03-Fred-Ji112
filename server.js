const express = require('express');
const app = express();

const min = require('minimist');
const args =min(process.argv.slice(2));


//Functions
function coinFlip() {
    var x = Math.random();
    if (x < .5) {
      return 'heads';
    } else {
      return 'tails';
    }
 }

 function coinFlips(flips) {
    const result = [];
    for(var i = 0; i < flips; i++) {
      result[i] = coinFlip();
    }
    return result;
 }

 function countFlips(array) {
    var x = 0;
    var y = 0;
    for(var i = 0; i < array.length; i++) {
      if (array[i] == 'heads') {
        x++;
      } else {
        y++;
      }
     
    }
    return {
      tails: y,
      heads: x
   }
 }

 function flipACoin(call) {
    var x = coinFlip();
    var y = '';
    if (call == x) {
       y = 'win';
    } else {
      y = 'lose';
    }
    return {
     call: call,
     flip: x,
     result: y 
    }
 }

 // end of functions


args['port'];
const port = args.port || 5000;

const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%', port))
});



app.get('/app/', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
    });

app.get('/app/flip/', (req,res) => {
    var flip = coinFlip();
    res.status(200).json({'flip': flip});
});

app.get('/app/flips/:number', (req, res) => {
    var flipsList = coinFlips(req.params.number);
    var summary = countFlips(flipsList);
    res.status(200).json({'raw': flipsList, 'summary': summary});
})

app.get('/app/flip/call/:guess', (req, res) => {
    var result = flipACoin(req.params.guess);
    res.status(200).json(result);
})

app.use(function(req, res) {
    res.status(404).send('404 NOT FOUND');
});