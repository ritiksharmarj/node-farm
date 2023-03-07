// import fs from 'fs';
const fs = require('fs');
const http = require('http');

///////////////////////////////
// FILES

// Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');

// Non blocking, async way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
//    console.log(data);
// });

///////////////////////////////
// SERVER
const server = http.createServer((req, res) => {
   console.log(req);
   res.end('Hello from the server!');
});

server.listen(8000, '127.0.0.1', () => {
   console.log('Listening to requests on port 8000');
});
