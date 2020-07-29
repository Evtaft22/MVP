import React from 'react';
import Movie from './Movie.jsx'

const Favorites = ({ favorites, home, remove, update }) => (
  <div>
    <button class='home' type='button' onClick={() => home()} >Back To Search</button>
    <h1>My Favorites</h1>
    <div>
      {favorites.map(({
        id,
        title,
        year,
        rated,
        released,
        runtime,
        genre,
        director,
        actors,
        plot,
        imdbRating,
        poster,
        review
      }) => (
          <Movie key={id} date={year} rating={imdbRating}
          rated={rated} released={released} runtime={runtime} 
          genre={genre} poster={poster} title={title} director={director}
          actors={actors} plot={plot} review={review} update={update} click={remove} />
      ))}
    </div>
  </div>
);

export default Favorites;