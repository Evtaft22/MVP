import React, { Component } from 'react';
import axios from 'axios';
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

    this.getFavs = this.getFavs.bind(this);
    this.removeFav = this.removeFav.bind(this);
    this.addFav = this.addFav.bind(this);
    this.getSearch = this.getSearch.bind(this);
    this.goHome = this.goHome.bind(this);
  }

  componentDidMount() {
    // console.log('This has started!!');
    // Document.getElementById('input-field').val(''); // check out React.refs
  }

  // FAVORITES
  getFavs() {
    axios.get('http://localhost:3000/getFavs', { headers: {
      'Content-Type': 'application/json'
    }})
    .then(res => this.setState({ favorites: res.data, clicked: true }))
    .then(() => console.log('Error getting favorites'))
    .catch(err => console.error(err, 'Error getting favorites'));
  }

  removeFav(title) {
    axios.delete('http://localhost:3000/delete', {
      headers: {'Content-Type': 'application/json'},
      data: {title}
    })
    .then(() => this.getFavs())
    .then(() => console.log('removeFav worked!!!!'))
    .catch(err => console.error(err, 'Did not removeFav'));
  }

  addFav(title) {
    axios.post('http://localhost:3000/postFavs',
      { title },
      { headers: {
        'Content-Type': 'application/json'
    }})
    .then(() => console.log('addFav worked!!!!'))
    .catch(err => console.error(err, 'Did not addFav'));
  }

  // SEARCH
  getSearch(title) {
    getMovie(title)
    .then(res => {
      const { Title, Year, Rated, Released, Runtime,
              Genre, Director, Actors, Plot, Poster,
              imdbRating } = res.data;
      const movieData = [ Title, Year, Rated, Released, Runtime,
                          Genre, Director, Actors, Plot, Poster,
                          imdbRating ];
      this.setState({ movie: movieData, searched: true });
    })
    .catch(err => console.error(err, 'Error sending Movie'));
  }

  // HOME BUTTON
  goHome() {
    this.setState({ searched: false, clicked: false });
  }

  render() {
    const { movie, favorites, clicked, searched } = this.state;
    if (!searched && !clicked) {
      return (
        <div id='main'>
          <h1>Movie Finder</h1>
          <Search getSearch={this.getSearch} />
          <button id='getFavs' type='button' onClick={() => this.getFavs()}>See Your Favorites</button>
        </div>
      );
    } else if (clicked) {
      return ( <Favorites favorites={favorites} remove={this.removeFav} home={this.goHome} /> );
    } else {
      const [ Title, Year, Rated, Released, Runtime,
              Genre, Director, Actors, Plot, Poster,
              imdbRating ] = movie;
      return (
        <div id='main'>
          <h1>Movie Finder</h1>
          <Search getSearch={this.getSearch} />
          <button id='seeFavs' type='button' onClick={() => this.getFavs()}>See Your Favorites</button>
          <div id='movie'>
            <div>
              <img src={Poster} />
            </div>
            <button type='button' onClick={() => this.addFav(Title)}>Favorite</button>
            <div>{Title}</div>
            <div>Made In: {Year}</div>
            <div>Rated: {Rated}</div>
            <div>Release Date: {Released}</div>
            <div>{Title} Is {Runtime} Long</div>
            <div>Genre: {Genre}</div>
            <div>Dircted By: {Director}</div>
            <div>Starring: {Actors}</div>
            <div>Plot: {Plot}</div>
            <div>IMDB gives {Title} a {imdbRating} out of 10</div>
          </div>
        </div>
      );
    }
  }
};

export default Main;