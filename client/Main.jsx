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

    this.getFavs = this.getFavs.bind(this); // renders favorites to screen
    this.removeFav = this.removeFav.bind(this);
    this.addFav = this.addFav.bind(this);
    this.getSearch = this.getSearch.bind(this); // passes search bar input as the "title" argument
    this.goHome = this.goHome.bind(this);
  }

  // INITIALIZE
  // when app initializes, render the favorites
  componentDidMount() {
    console.log('This has started!!');
    // Document.getElementById('input-field').val(''); // check out React.refs
  }

  // FAVORITES
  // renders favorites on request
  getFavs() {
    return axios.get('http://loclahost:8080/server/getFavs', { headers: {
      'Acccept': 'application/json, text/plain, */*',
      'Access-Control-Allow-Origin': '*',  
      'withCredentials': false
      // 'Content-Type': 'application/json'
    }})
    .then(res => {
      console.log(res, 'getFavs yayayay');
      this.setState({ favorites: res, clicked: true })
    })
    .then(() => console.log('getFavs actually works!!!'))
    .catch(err => console.error(err, 'Error getting favorites'));
  }

  removeFav(event) {
    axios.delete('http://localhost:8080/server/delete',
    { data: event.target.value },
    { headers: {
      'Acccept': 'application/json, text/plain, */*',
      'Access-Control-Allow-Origin': '*',
      'withCredentials': false
      // 'Content-Type': 'application/json'
    }})
    .then(() => this.getFavs())
    .then(() => console.log('removeFav worked!!!!'))
    .catch(err => console.error(err, 'Did not removeFav'));
  }

  addFav(title) {
    return axios.post('http://localhost:8080/server/postFavs',
    { title },
    { headers: {
      'Acccept': 'application/json, text/plain, */*',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'withCredentials': false
    }})
    .then(res => console.log(res, 'addFav worked!!!!'))
    .catch(err => console.error(err, 'Did not addFav'));
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

  goHome() {
    console.log('home button was clicked');
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
      return ( <Favorites favorites={ favorites } remove={this.removeFav} home={this.goHome} /> );
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
            <div onClick={() => this.addFav(Title)}>
              <img src={Poster} />
            </div>
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