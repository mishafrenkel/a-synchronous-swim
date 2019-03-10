const fs = require('fs');
const headers = require('./cors');
const multipart = require('./multipartUtils');
// const messageQueue = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = './background.jpg';
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
}

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
  }

  if (req.method === 'GET') {
    if (req.url === '/') {
      res.writeHead(200, headers);
      var command = messageQueue.dequeue();
      if (command) {
        console.log('Responding with', command);
        res.end(command);
      } else {
        res.end();
      }
    }
  }

  if (req.url === '/background.jpg') {
    fs.readFile(module.exports.backgroundImageFile, (err, fileData) => {
      if (err) {
        res.writeHead(404);
      } else {
        res.writeHead(200, {
          'Content-Type': 'image/jpeg',
          'Content-Length': fileData.length
        });
        res.write(fileData, 'binary');
      }
      res.end();
      next();
    });
  }

  if (req.method === 'POST' && req.url === '/background.jpg') {
    var imageData = Buffer.alloc(0);

    req.on('data', (chunk) => {
      imageData = Buffer.concat([imageData, chunk]);
    });

    req.on('end', () => {
      var file = multipart.getFile(imageData);
      fs.writeFile(module.exports.backgroundImageFile, file.data, (err) => {
        res.writeHead(err ? 400 : 201, headers);
        res.end();
        next();
      });
    });
  }
  
    
};

// module.exports.backgroundImageFile = './background.jpg';
////////////////////////////////////////////////////////

