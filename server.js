require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
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
        reject(console.error(err, 'postFavorite error'));
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
  .then(() => res.status(201).send(console.log('Movie was added to favorites.')))
  .catch(err => res.status(500).send(console.error(err, 'app.postFavs error')));
});

const ridFav = (title) => {
	deleteQuery = `DELETE FROM favorites WHERE title="${title}";`;
	return new Promise((resolve, reject) => {
		db.query(deleteQuery, err => {
			if (err) {
				reject(console.error(err, 'this happened when deleting'));
			} else {
				resolve(console.log('That favorite is gone!'));
			}
		});
	});
};

app.delete('/delete', (req, res) => {
  const { title } = req.body;
	ridFav(title)
	.then(() => res.status(200).send(console.log('got rid of it yeeeeeeees')))
  .catch(err => res.status(500).send(console.error(err, 'well at least you are getting something my dude')));
});


const update = (review, title) => {
	const updateQuery = `UPDATE favorites SET review="${review}" WHERE title="${title}";`;
	console.log(updateQuery);
	return new Promise((resolve, reject) => {
		db.query(updateQuery, err => {
			if (err) {
				reject(console.error(err, 'rejecteddddd'));
			} else {
				resolve(console.log('be reasonable, we can resolve this like gentlemen'));
			}
		});
	});
};

app.post('/update', (req, res) => {
	console.log(req.body, 'req.bodyyyy');
	const { review, title } = req.body;
	update(review, title)
	.then(() => res.status(201).send(console.log('review has been updated')))
  .catch(err => res.status(500).send(console.error(err, 'not Updated!!!!')));
});

module.exports = {
	app,
	db
};