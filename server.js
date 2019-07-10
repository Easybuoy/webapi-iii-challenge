const express = require('express');

const userRoutes = require('./users/userRouter');

const server = express();

//custom middleware
server.use(logger)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

server.use('/api/users', userRoutes)


function logger(req, res, next) {
console.log(req.method);
console.log(req.url);
console.log(new Date().getTime());
next();
};

module.exports = server;
