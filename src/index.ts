import https from 'https';
import fs from 'fs';
import path from 'path';
import helmet from 'helmet';
import { rooms } from './router/room-router';
import { reservations } from './router/reservation-router';
 
const express = require('express')
const app = express();
const port = 3000;

const options =  {
	key: fs.readFileSync(path.join(__dirname, '../key.pem')),
	cert: fs.readFileSync(path.join(__dirname, '../cert.pem'))
};

app.use(helmet());


app.use(express.json())

app.use('/rooms', rooms)
app.use('/reservations', reservations)
 
https.createServer(options, app).listen(port, () => {
	console.log(`Running 'secure-http' on ${port}`);
});