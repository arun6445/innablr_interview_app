'use strict';

const express = require('express');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config()
// Constants
const PORT = 8080;
const HOST = '127.0.0.1';

// App
const app = express();
app.get('/', (req, resp) => {
  resp.send('Hello world\n');
});

var obj = JSON.parse(fs.readFileSync('src/metadata.json', 'utf8'))
var status_response = {
    "myapplication": [
        {
        "version": obj.version,
        "description": obj.description,
        "lastcommitsha": process.env.SHA
        }
    ]
   }
app.get('/status', (req, resp) => {
  resp.send(status_response);
})

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);