import https from 'https';
import express from 'express';
import fs from 'fs';
import path from 'path';
import helmet from 'helmet';
 
const app = express();
const port = 3000;

app.use(helmet());
 
https.createServer(app).listen(port, () => {
	console.log(`Running 'secure-http' on ${port}`);
});