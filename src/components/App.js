import React, { Component } from 'react';
import './styles/App.css';
import PokemonContainer from './PokemonContainer/PokemonContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PokemonContainer />
      </div>
    )
  }
}

export default App;
