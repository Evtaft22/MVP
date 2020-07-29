import React from 'react';
import Movie from './Movie.jsx'

const Favorites = ({ favorites, home, remove }) => (
  <div>
    <button id='home' type='button' onClick={() => home()} >Back To Search</button>
    <h1>My Favorites</h1>
    <div>
      {favorites.data.map(({ 
        id,
        title,
        director,
        actors,
        plot,
        poster }) => (
          <Movie key={id} poster={poster} title={title} director={director} actors={actors} plot={plot} remove={remove} />
      ))}
    </div>
  </div>
);

export default Favorites;