// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
require('dotenv')

server.use(middlewares)
// server.use('', router)
server.use(jsonServer.bodyParser)

//!  ===  GET all users
server.get('/users', (req,res)=>{
  const users = router.db.get('user').value()
  res.json(users);
})

//! === GET user by ID
server.get('/user/:id', (req, res) => {

  const user = router.db.get('user').find({ id: req.params.id}).value();
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
});

//! === POST a new user
server.post('/user', (req, res) => {
  const users = router.db.get('user').value();
  const newId = users.length + 1 + ""; // converting to string
  const newUser = { id: newId, ...req.body };
  router.db.get('user').push(newUser).write();
  res.json(newUser);
});






//! === PUT (update) an existing user
server.put('/user/:id', (req, res) => {

  const updateUser = req.body;
  router.db.get('user').find({ id: req.params.id }).assign(updateUser).write();
  res.json(updateUser);
});

//! === DELETE an existing user
server.delete('/user/:id', (req, res) => {

  router.db.get('user').remove({ id: req.params.id }).write();
  res.sendStatus(200);
});

server.listen(process.env.PORT || 5000, () => {
  console.log('JSON Server is running')
})
