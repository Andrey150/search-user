const http = require('http')
const users = require('./api/Users.json')
const usersRouter = require('./routes/users.routes');
const corsMiddleware = require("./middleware/cors.middleware");
let fs = require('fs');

const PORT = 5000

const server = http.createServer((req, res) => {
  corsMiddleware(req, res)
  if (req.url === '/' || req.url === '/search-user') {
    const data = JSON.stringify(users)
    res.setHeader('Content-Type', 'application/json');
    res.write(data); // Отправка массива users в виде JSON-ответа
  }

  if (req.url === '/add-user') {
    usersRouter(req, res, () => {
      res.statusCode = 404;
      res.end('Not found');
    });
  }

  if (req.url === '/delete-user') {
    usersRouter(req, res, () => {
      res.statusCode = 404;
      res.end('Not found');
    });
  }

  if (req.url === '/update-user') {
    usersRouter(req, res, () => {
      res.statusCode = 404;
      res.end('Not found');
    });
  }

  res.end();

})

server.listen(PORT, 'localhost', (error) => {
  error ? console.log(error) : console.log(`listen port ${PORT}`)
})