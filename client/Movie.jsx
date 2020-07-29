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
    <button class='remove' type='button' onClick={() => click(title)}>Remove</button>
    <div id='poster' >
      <img src={poster} />
    </div>
    <div id='title' >{title}</div>
    <div id='director' >Dircted By: {director}</div>
    <div id='stars' >Starring: {actors}</div>
    <div id='plot' >Plot: {plot}</div>
  </div>
);

export default Movie;
