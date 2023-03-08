// Core Modules
const fs = require('fs');
const http = require('http');
const url = require('url');

// 3rd Party Modules
const slugify = require('slugify');

// Own Modules
const replaceTemplate = require(`${__dirname}/modules/replaceTemplate`);

///////////////////////////////
// SERVER

// Selecting Templates
const tempOverview = fs.readFileSync(
   `${__dirname}/templates/template-overview.html`,
   'utf-8'
);
const tempProduct = fs.readFileSync(
   `${__dirname}/templates/template-product.html`,
   'utf-8'
);
const tempCard = fs.readFileSync(
   `${__dirname}/templates/template-card.html`,
   'utf-8'
);

/**
 * Read data from the data.json API file
 * Blocking, synchronous, execute once
 */
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

// create slugs
const slugs = dataObj.map((dataEl) =>
   slugify(dataEl.productName, {
      lower: true,
   })
);
console.log(slugs);

// Routing
const server = http.createServer((req, res) => {
   // Parsing variables from URLs
   const { query, pathname } = url.parse(req.url, true);

   // Overview page
   if (pathname === '/' || pathname === '/overview') {
      res.writeHead(200, { 'content-type': 'text/html' });

      const cardsHtml = dataObj
         .map((dataEl) => replaceTemplate(dataEl, tempCard))
         .join('');
      const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
      res.end(output);
   }

   // Product page
   else if (pathname === '/product') {
      const product = dataObj[query.id];
      const output = replaceTemplate(product, tempProduct);
      res.end(output);
   }

   // API
   else if (pathname === '/api') {
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(data);
   }

   // Not found
   else {
      res.writeHead(404, {
         'content-type': 'text/html',
         'my-own-header': 'hello world',
      });
      res.end('<h1>Page not found!</h1>');
   }
});

server.listen(8000, '127.0.0.1', () => {
   console.log('Listening to requests on port 8000');
});
