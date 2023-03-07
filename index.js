// import fs from 'fs';
const fs = require('fs');

// Blocking, synchronous way
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');

// Non blocking, async way
fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
   console.log(data);
});
