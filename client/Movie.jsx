import React from 'react';

const Movie = ({
  id,
  title,
  director,
  actors,
  plot,
  poster,
  remove,
}) => (
  <div id="fav">
    <div onClick={() => remove(id)}>
      <img src={poster} />
    </div>
    <div>{title}</div>
    <div>Dircted By: {director}</div>
    <div>Starring: {actors}</div>
    <div>Plot: {plot}</div>
  </div>
);

export default Movie;
