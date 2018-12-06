// Dependencies

const http = require('http');
const url =require('url');
const {StringDecoder} = require('string_decoder');
// The server should respond to all requests with a string
const server = http.createServer((req,res) => {

  // Get the url and parse it
  let parsedUrl = url.parse(req.url,true);

  // Get the path 
  let path = parsedUrl.pathname;
  let trimmedPath = path.replace(/^\/+|\/+$/g,'')

  // Get the query string as an object
  let queryStringObject = parsedUrl.query;

  // Get the HTTP Method
  let method = req.method.toLowerCase();

  // Get the headers as an object
  let headers = req.header;

  // Get the payload, if any
  let decoder = new StringDecoder('utf-8');
  let buffer = '';

  // As the data is streaming in, the request object 'req' emits the data event and send a bunch undecoded data and we decoded using utf-8 and append the results to buffer 
  req.on('data', (data) => {
    buffer += decoder.write(data);
  })
  
  req.on('end', () => {
    buffer += decoder.end();

    // Chose the handler this request should go to.
    let chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    // Construct the data object to send to the handler
    let data = {
      'trimmedPath' : trimmedPath,
      'queryStringObject' : queryStringObject,
      'method' : method,
      'headers' : headers,
      'payload' : buffer
    }

    // Route the request to the handler specified in the router
    chosenHandler(data, (statusCode, payload) => {
      // Use the status code callback by the handler, or default to 200
      statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

      // Use the payload called back by the handler, or default to an empty object 
      payload = typeof(payload) == 'object' ? payload : {};

      // Convert the payload to a string
      let payloadString = JSON.stringify(payload);

      // Return the response
      res.writeHead(statusCode);
      res.end(payloadString);

      // Log the request path 
      console.log(statusCode,payloadString);
    });
  });
});

// Start the server, and have it listen on port 3000
server.listen(3000, () => {
  console.log('The server is listening on port 3000');
})

// Define the handlers
const handlers = {};

// Sampler handler

handlers.sample = (data, callback) => {
  // Callback a http status code, and payload object
  callback(406,{'name':'sampler handler'});
}

// Not found handler
handlers.notFound = (data, callback) => {
  callback(404);
}

// Define a request router
const router = {
  'sample' : handlers.sample
};