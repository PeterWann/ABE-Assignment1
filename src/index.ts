// Secure HTTPS code is inspired from example/lesson-03/secure-http from course repo
import express from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';
import helmet from 'helmet';
import { users } from './router/users-router';
import { decode } from 'jsonwebtoken';
import { UserRoles } from './model/user';
import { rooms } from './router/room-router';
import { reservations } from './router/reservation-router';
 
const app = express();
const port = 3000;

app.use(express.static('public'));

const options = {
	key: fs.readFileSync(path.join(__dirname, '..', 'key.pem')),
	cert: fs.readFileSync(path.join(__dirname,'..', 'cert.pem'))
}

app.use(helmet());

app.use('/users', users);
app.use('/rooms', rooms);
app.use('/reservations', reservations);


app.get('', (req, res) => {
	res.json({
	  'message': 'API is live!'
	})
  })

app.use((req, res, next) => {
	const token = req.get('authorization')?.split(' ')[1]
	if(token) {
	  const jwt = decode(token, { json: true })
	  if(jwt?.role === UserRoles.Clerk || UserRoles.Guest || UserRoles.Manager) {
		next()
	  } else {
		res.sendStatus(401)
	  }
	} else {
	  res.sendStatus(400)
	}
  })


app.use(express.json())

 
https.createServer(options, app).listen(port, () => {
	console.log(`Running 'secure-http' on ${port}`);
});