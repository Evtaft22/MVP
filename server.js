require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const router = express.Router();
app.use('/server.js', cors(), router);

const { getMovie } = require('./client/apiHelper')
const { postFavorite, getFavorites } = require('./helpers');
const { PORT } = process.env;

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

app.listen(PORT, err => {
	if (err) {
		console.error(err, 'Could not hear PORT');
	} else {
		console.log(`Listening on PORT:${PORT}`);
	}
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/index.html')));


// app.post = ('/postMovies', (req, res) => {
//   console.log(req.body, 'for rendering movies');
//   const { title } = req.body;
//   getMovie(title)
//   .then(movieData => res.status(201).send(movieData))
//   .catch(err => res.status(500).send(console.error(err, 'Could not add movie to favorites.')));
// });


// recieves get request from client through the componentDidMount
// grabs all favorites from database
// renders them to the page
app.get('/getFavs', (req, res) => {
  res.send(console.log('hey'));
  getFavorites()
  .then(favsList => res.status(200).send(favsList))
  .catch(err => res.status(500).send(console.error(err, 'Could not get your favorites.')));
});

// recieves post from handle favs
app.post('/postFavs', (req, res) => {
	console.log(req.body, 'for adding favs'); // should be a title
	const { title } = req.body;
	getMovie(title)
  .then(movieData => {
		return Promise.resolve(postFavorite(movieData));
	})
  .then(res => res.status(201).send(console.log('Movie was added to favorites.')))
  .catch(err => res.status(500).send(console.error(err, 'Could not add movie to favorites.')));
});

// delete favorite by id
app.delete('/delete', (req, res) => {
	console.log(req.body, 'for delete') // should be an id
});

module.exports = {
	app,
	db
};