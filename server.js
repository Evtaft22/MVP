require('dotenv').config();
const express = require('express');
const path = require('path');
const mysql = require('mysql2');

const { PORT } = process.env;

const app = express();

app.listen(PORT, err => {
	if (err) {
		console.error(err, 'Could not hear PORT');
	} else {
		console.log(`Listening on PORT:${PORT}`);
	}
});

app.get('/test', (req, res, error) => {
	if(error) {
		console.error(error, 'this is what\'s wrong with /test');
	} else {
		res.send('tteret');
	}
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './client/index.html')));

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'mvp'
});

db.connect(err => {
	if (err) {
		console.error(err, 'database not connecting');
	} else {
		console.log('Database is connected');
	}
});

module.exports.app = app;
