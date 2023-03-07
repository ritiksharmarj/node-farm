const fs = require('fs');
const http = require('http');
const url = require('url');

///////////////////////////////
// SERVER

const replaceTemplate = (dataEl, tempCard) => {
   let output = tempCard.replace(/{%PRODUCTNAME%}/g, dataEl.productName);
   output = output.replace(/{%IMAGE%}/g, dataEl.image);
   output = output.replace(/{%FROM%}/g, dataEl.from);
   output = output.replace(/{%NUTRIENTS%}/g, dataEl.nutrients);
   output = output.replace(/{%QUANTITY%}/g, dataEl.quantity);
   output = output.replace(/{%PRICE%}/g, dataEl.price);
   output = output.replace(/{%ID%}/g, dataEl.id);
   output = output.replace(/{%DESCRIPTION%}/g, dataEl.description);
   output = output.replace(/{%DESCRIPTION%}/g, dataEl.description);

   if (!dataEl.organic)
      output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

   return output;
};

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

// Blocking, synchronous, execute once
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
   // Routing
   const pathName = req.url;

   // Overview page
   if (pathName === '/' || pathName === '/overview') {
      res.writeHead(200, { 'content-type': 'text/html' });

      const cardsHtml = dataObj
         .map((dataEl) => replaceTemplate(dataEl, tempCard))
         .join('');
      const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
      res.end(output);
   }

   // Product page
   else if (pathName === '/product') {
      res.end('This is the PRODUCT');
   }

   // API
   else if (pathName === '/api') {
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
