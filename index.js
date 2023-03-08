const fs = require('fs');
const http = require('http');
const url = require('url');

///////////////////////////////
// SERVER

/**
 * Returns the template card as output
 * @param {object} dataEl - Data coming from the data.json API
 * @param {string} template - Template Card Component
 * @returns {string} template card
 */
const replaceTemplate = (dataEl, template) => {
   let output = template.replaceAll('{%PRODUCTNAME%}', dataEl.productName);
   output = output.replaceAll('{%IMAGE%}', dataEl.image);
   output = output.replaceAll('{%FROM%}', dataEl.from);
   output = output.replaceAll('{%NUTRIENTS%}', dataEl.nutrients);
   output = output.replaceAll('{%QUANTITY%}', dataEl.quantity);
   output = output.replaceAll('{%PRICE%}', dataEl.price);
   output = output.replaceAll('{%ID%}', dataEl.id);
   output = output.replaceAll('{%DESCRIPTION%}', dataEl.description);
   output = output.replaceAll('{%DESCRIPTION%}', dataEl.description);

   if (!dataEl.organic)
      output = output.replaceAll('{%NOT_ORGANIC%}', 'not-organic');

   return output;
};

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
