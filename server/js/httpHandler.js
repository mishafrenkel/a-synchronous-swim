const fs = require('fs');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messageQueue = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = './background.jpg';
////////////////////////////////////////////////////////

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  // search node response for body
  if (req.method === "GET") {
    res.writeHead(200, headers);
    // function getRandom(min, max) {
    //   return Math.floor(Math.random() * (max - min) + min);
    // }
    // const validMessages = ['left', 'right', 'up', 'down'];
    // let rand = getRandom(0, 4);

    res.end(messageQueue.dequeue());
  } else {
    res.writeHead(200, headers)
    res.end();
  }
    
};

module.exports.backgroundImageFile = './background.jpg';
////////////////////////////////////////////////////////

