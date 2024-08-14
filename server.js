const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

server.post('/users', (req, res) => 
    {
        const { username, password } = req.body;

        const user = router.db.get('users').find({ username, password }).value();
        if (user) 
        {
            res.json(user);
        } 
        else {  res.status(401).json({ error: 'Invalid credentials' });   }
    });

server.listen(8000, () => {
  console.log('JSON Server is running on port 8000');
});