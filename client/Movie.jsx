import React from 'react';

const Movie = ({
  title,
  date,
  rated,
  released,
  runtime,
  genre,
  director,
  actors,
  plot,
  rating,
  poster,
  click
}) => (
  <div id="fav">
    <button class='remove' type='button' onClick={() => click(title)}>Remove</button>
    <div id='poster' >
      <img src={poster} />
    </div>
    <div id='title' >{title}</div>
    <div id='date' >Made In: {date}</div>
    <div id='rated' >Rated: {rated}</div>
    <div id='release' >Release Date: {released}</div>
    <div id='length' >{title} Is {runtime} Long</div>
    <div id='genre' >Genre: {genre}</div>
    <div id='director' >Dircted By: {director}</div>
    <div id='stars' >Starring: {actors}</div>
    <div id='plot' >Plot: {plot}</div>
    <div id='rating' >IMDB gives {title} a {rating} out of 10</div>
  </div>
);

export default Movie;
