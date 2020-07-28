import React, { Component } from 'react';
import axios from 'axios';
import jquery from 'jquery';
import { getMovie } from './apiHelper';
import Search from './Search.jsx'
import Favorites from './Favorites.jsx'

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: {},
      favorites: [],
      clicked: false,
      searched: false,
    };

    this.getSearch = this.getSearch.bind(this); // passes search bar input as the "title" argument
  }

  // INITIALIZE
  // when app initializes, render the favorites
  componentDidMount() {
    console.log('This has started!!');
    // Document.getElementById('input-field').val(''); // check out React.refs
  }

  getSearch(title) {
    getMovie(title)
    .then(res => {
      console.log(res.data, 'this is res.data');
      const { Title, Year, Rated, Released, Runtime,
              Genre, Director, Actors, Plot, Poster,
              imdbRating } = res.data;
      const movieData = [ Title, Year, Rated, Released, Runtime,
                          Genre, Director, Actors, Plot, Poster,
                          imdbRating ];
      console.log(movieData, 'this is movieData');
      this.setState({ movie: movieData, searched: true });
    })
    .then(() => console.log('this is sending a Movie'))
    .catch(err => console.error(err, 'Error sending Movie'));
  }

  render() {
    const { movie, favorites, clicked, searched } = this.state;
      return (
        <div id='main'>
          <h1>Movie Finder</h1>
          <Search getSearch={this.getSearch} />
          <button id='getFavs' type='button' onClick={() => this.getFavs()}>See Your Favorites</button>
        </div>
      );
  }
};

export default Main;