const jsonServer = require('json-server')
const fs = require('fs');
// const cors=require("cors")
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
// server.use(cors)
fs.chmodSync('db.json', '666')
server.use(middlewares)
server.use(jsonServer.bodyParser)
server.use(router)
server.listen(process.env.PORT || 3000, () => {
  console.log('JSON Server is running')
});