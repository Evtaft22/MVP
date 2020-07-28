import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: ''
    }

    this.handleChange = this.handleChange.bind(this); // this will change the state of title when the query is submitted
    this.handleClick = this.handleClick.bind(this); // this will call onSearch to send title query to server
  }

  handleChange(event) {
    this.setState({
      title: event.target.value
    });
    console.log('event handled')
  }

  handleClick() {
    const { getSearch } = this.props;
    const { title } = this.state;
    getSearch(title);
    console.log('ran search')
  }

  render() {
    const { title } = this.state;
    return (
      <div>
        <h3>Search Movie Title</h3>
        <input id='input-field' type='text' value={title} onChange={this.handleChange}></input>
        <button type='button' onClick={this.handleClick}>Gimme The Deets!</button>
        <button type='button' onClick={this.handleClick}>Random Movie!</button>
      </div>
    );
  }
}

export default Search;