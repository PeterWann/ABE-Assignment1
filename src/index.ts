import express from 'express';
import { users } from './router/users-router';
 
const app = express();
const port = 3000;

app.use(express.static('public'));

app.use('/users', users);

app.get('', (req, res) => {
	res.json({
	  'message': 'API is live!'
	})
  })
 
app.listen(port, () => {
	console.log(`Running 'authentication' on ${port}`)
})