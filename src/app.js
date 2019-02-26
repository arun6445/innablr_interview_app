'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '127.0.0.1';

// App
const app = express();
app.get('/', (req, resp) => {
  resp.send('Hello world\n');
});

status_response = {
    "myapplication": [
        {
        "version": "1.0",
        "description": "pre-interview technical test",
        "lastcommitsha": "abc57858585"
        }
    ]
   }
app.get('/status', (req, resp) => {
  resp.send(status_response);
})

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);