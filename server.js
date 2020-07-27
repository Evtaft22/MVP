require('dotenv').config();
const mysql = require('mysql2');
const express = require('express');
const path = require('path');

const { PORT } = process.env;

const app = express();

app.listen(PORT, err => {
	if (err) {
		console.error(err, 'Could not hear PORT');
	} else {
		console.log(`Listening on PORT:${PORT}`);
	}
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, './index.html'));
});

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
