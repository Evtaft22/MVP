import React from 'react';
import Movie from './Movie.jsx'

const Favorites = ({ favorites, home, remove }) => (
  <div>
    <button id='home' type='button' onClick={() => home()} >Back To Search</button>
    <h1>My Favorites</h1>
    <div>
      {favorites.map(({
        id,
        poster,
        title,
        director,
        actors,
        plot
      }) => (
          <Movie key={id} poster={poster} title={title} director={director} actors={actors} plot={plot} click={remove} />
      ))}
    </div>
  </div>
);

export default Favorites;