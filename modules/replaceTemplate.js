/**
 * Returns the template card as output
 * @param {object} dataEl - Product coming from the data.json API
 * @param {string} template - Template Card Component
 * @returns {string} template card
 */
module.exports = (dataEl, template) => {
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
