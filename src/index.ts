import https from 'https';
import express from 'express';
import fs from 'fs';
import path from 'path';
import helmet from 'helmet';
 
const app = express();
const port = 3000;

const options =  {
	key: fs.readFileSync(path.join(__dirname, '../key.pem')),
	cert: fs.readFileSync(path.join(__dirname, '../cert.pem'))
};

app.use(helmet());

app.get('', (req, res) => {
	res.json({
		"message": "Hello, HTTPS! 👋"
	});
});
 
https.createServer(options, app).listen(port, () => {
	console.log(`Running 'secure-http' on ${port}`);
});