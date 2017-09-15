var querystring = require('querystring');

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};
var time = new Date();
var uniqueId = 0;
var responseObj = {results: [{username: 'Jono', text: 'Do my bidding!', roomname: 'lobby', createdAt: time}]};

var requestHandler = function(request, response) {
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/json';

  console.log('Serving request type ' + request.method + ' for url ' + request.url); 
  
  
  if (request.method === 'OPTIONS' && request.url.includes('/classes/messages')) {
    response.writeHead(200, headers);
    response.end(JSON.stringify(responseObj));

  } else if (request.method === 'GET' && request.url.includes('/classes/messages')) {
    response.writeHead(200, headers);
    response.end(JSON.stringify(responseObj));

  } else if (request.method === 'POST' && request.url.includes('/classes/messages')) {
    var messageData = [];
    request.on('data', (data) => {
      messageData.push(data);
    });
    request.on('end', () => {
      var messageObj = messageData.toString();
      messageObj = querystring.parse(messageObj);
      messageObj.createAt = new Date();
      uniqueId++;
      console.log(uniqueId);
      messageObj.objectId = uniqueId;
      responseObj.results.push(messageObj);

      response.writeHead(201, headers);
      response.end(JSON.stringify(responseObj));
    });

  } else {
    response.writeHead(404, headers);
    response.end();
  }

};

exports.requestHandler = requestHandler;









