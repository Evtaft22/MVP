require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// const CLIENT_PATH = path.join(__dirname, '/index.html');

// app.use(express.static(CLIENT_PATH));
// app.use(express.json());
// const { Router } = require('express');
app.use(cors());
const router = express.Router();
app.use('/server.js', cors(), router);
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
	res.header('Access-Control-Allow-Headers', 'Content-Type,Origin,Authorization,Accept,X-Requested-With');
	res.header('Access-Control-Allow-Methods', 'POST,GET,DELETE,OPTIONS,PUT');
	next();
});


const { getMovie } = require('./client/apiHelper')
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

const getFavorites = () => {
  const queryStr = `SELECT * FROM favorites;`;
  return new Promise((resolve, reject) => {
    db.query(queryStr, (err, favsList) => {
      if (err) {
        reject(console.error(err, 'Could not fetch movie from DB.'));
      } else {
        resolve(favsList);
      }
    });
  });
};

// recieves get request from client through the componentDidMount
// grabs all favorites from database
// renders them to the page
app.get('/getFavs', (req, res) => {
  getFavorites()
  .then(favsList => res.status(200).send(favsList))
  .catch(err => res.status(500).send(console.error(err, 'Could not get your favorites.')));
});

const postFavorite = (movieObj) => {
  const { Title, Year, Rated, Released, Runtime, Genre,
				Director, Actors, Plot, Poster, imdbRating, } = movieObj;
  const moviesQuery = `INSERT INTO favorites(title, date, rated, released, runtime, genre, director, actors, plot, poster, rating) VALUES("${Title}", "${Year}", "${Rated}", "${Released}", "${Runtime}", "${Genre}", "${Director}", "${Actors}", "${Plot}", "${Poster}", "${imdbRating}");`;
  return new Promise((resolve, reject) => {
    db.query(moviesQuery, err => {
      if (err) {
        reject(console.log(err, "postFavorite error"));
      } else {
        resolve(console.log('Movie data was added to DB successfully!'));
      }
    });
  });
};

app.post('/postFavs', (req, res) => {
	const { title } = req.body;
	getMovie(title)
  .then(movieData => postFavorite(movieData.data))
  .then(() => console.log('Movie was added to favorites.'))
  .catch(err => res.status(500).send(console.error(err, 'app.postFavs error')));
});

// delete favorite by id
app.delete('/delete', (req, res) => {
	console.log(req.body, 'for delete') // should be an id
});

module.exports = {
	app,
	db
};