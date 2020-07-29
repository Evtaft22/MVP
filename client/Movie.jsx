import React from 'react';

const Movie = ({
  title,
  director,
  actors,
  plot,
  poster,
  click
}) => (
  <div id="fav">
    <div>
      <img src={poster} />
    </div>
    <button type='button' onClick={() => click(title)}>Remove</button>
    <div>{title}</div>
    <div>Dircted By: {director}</div>
    <div>Starring: {actors}</div>
    <div>Plot: {plot}</div>
  </div>
);

export default Movie;
