const { db } = require('./server');

// this will check if the movie title is in the db
// if so it will remove from the db
// if not it will add it to the db
// takes in mvoie data from the API
// organizes specific data and adds it to the favorites table in the DB
const postFavorite = (movieObj) => {
  const {
    Title,
    Year,
    Rated,
    Released,
    Runtime,
    Genre,
    Director,
    Actors,
    Plot,
    Poster,
    imdbRating,
  } = movieObj;
  const moviesQuery = `INSERT INTO favorites (title, year, rated, released,
                    runtime, genre, director, actors, plot, poster, rating)
                    VALUES (${Title}, ${Year}, ${Rated}, ${Released},
                    ${Runtime}, ${Genre}, ${Director}, ${Actors},
                    ${Plot}, ${Poster}, ${imdbRating});`;
  return new Promise((resolve, reject) => {
    db.query(moviesQuery, movieObj, err => {
      if (err) {
        reject(console.error(err, "Couldn't add movie data to DB."));
      } else {
        resolve(console.log('Movie data was added to DB successfully!'));
      }
    });
  });
};

// const postFavorite = (movieObj, callback) => {
//   const moviesQuery = `INSERT INTO favorites (title, year, rated, released,
//                     runtime, genre, director, actors, plot, poster, rating)
//                     VALUES (${movieObj.Title}, ${movieObj.Year}, ${movieObj.Rated}, ${movieObj.Released},
//                     ${movieObj.Runtime}, ${movieObj.Genre}, ${movieObj.Director}, ${movieObj.Actors},
//                     ${movieObj.Plot}, ${movieObj.Poster}, ${movieObj.imdbRating});`;
//   db.query(moviesQuery, movieObj, (err, data) => {
//     if (err) {
//       console.error(err, "Couldn't add movie data to DB.");
//       callback(err, null);
//     } else {
//       console.log('Movie data was added to DB successfully!');
//       callback(null, data);
//     }
//   });
// };




//  when a user searches for a movie, by title,
// the title is routed to the post and get routes in movies.js
// the post will fetch it from the API and save to the database
// then the get will call this function which will retrieve the movie details
// from the database and render it on to the screen
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

module.exports = {
  postFavorite,
  getFavorites
};
