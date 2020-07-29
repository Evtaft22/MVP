import React, { Component } from 'react';

class Movie extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      userReview: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ userReview: event.target.value });
  }

  onSubmit() {
    const { update, title } = this.props;
    const { userReview } = this.state;
    update(userReview, title);
  }

  render() {
    const { title, date, rated, released,
            runtime, genre, director,
            actors, plot, rating, poster,
            review, click } = this.props;
    const { userReview } = this.state;

    return (
      <div id="fav">
        <button class='remove' type='button' onClick={() => click(title)}>Remove</button>
        <div id='poster' >
          <img src={poster} />
        </div>
        <input class='user-input' type='text' value={userReview} onChange={this.onChange}></input>
        <button class='review-btn' type='button' onSubmit={this.onSubmit}>Submit</button>
        <div class='review'>{review}</div>
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
  };
};

export default Movie;
