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

server.post('/favoured-recipes', (req, res) => 
    {
        const { userId, recipeId } = req.body;
        console.log(userId);
        
      
        const user = router.db.get('users').find({ id: userId }).value();
        if (!user) {
          res.status(404).json({ error: 'User not found' });
          return;
        }
      
        const recipe = router.db.get('recipes').find({ id: recipeId }).value();
        if (!recipe) {
          res.status(404).json({ error: 'Recipe not found' });
          //return;
        }
      
        const favouredRecipe = {
          userId,
          recipeId,
          recipe
        };
      
        router.db.get('favoured-recipes').push(favouredRecipe).write();
      
        res.json(favoredRecipe);
    });


server.listen(8000, () => { console.log('JSON Server is running on port 8000'); });


