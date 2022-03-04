// Secure HTTPS code is inspired from example/lesson-03/secure-http from course repo
import express from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';
import helmet from 'helmet';
import { users } from './router/users-router';
import { user } from './router/user-router';
import { login } from './router/login-router';
import { decode } from 'jsonwebtoken';
import { UserRoles } from './model/user';
import { rooms } from './router/room-router';
import { reservations } from './router/reservation-router';
import { VerifyRoles } from './helper/verify-role';
 
const app = express();
const port = 3000;

app.use(express.static('public'));

const options = {
	key: fs.readFileSync(path.join(__dirname, '..', 'key.pem')),
	cert: fs.readFileSync(path.join(__dirname,'..', 'cert.pem'))
}

app.use(helmet());

app.use('/users', users);
app.use('/user', user);
app.use('/login', login);


app.get('', (req, res) => {
	res.json({
	  'message': 'API is live!'
	})
  })

app.use((req, res, next) => {
	let verifyRole = VerifyRoles(true, true, true, req)
	if (verifyRole === true) {
		next()
	} else if (verifyRole === "Invalid Token") {
		res.sendStatus(400)
	} else {
		res.sendStatus(401)
	}
  })

app.use('/rooms', rooms);
app.use('/reservations', reservations);

app.use(express.json())

 
https.createServer(options, app).listen(port, () => {
	console.log(`Running 'secure-http' on ${port}`);
});