import React, { Component } from 'react';
import './styles/App.css';
import PokemonContainer from './PokemonContainer/PokemonContainer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      pokemon: [],
    }
  }
  componentDidMount() {
    const url = 'https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json';
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({
        pokemon: data.pokemon
      }))
  }
  render() {
    return (
      <div className="App">
        <PokemonContainer data={this.state.pokemon} />
      </div>
    )
  }
}

export default App;
