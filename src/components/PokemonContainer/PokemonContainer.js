import React, { Component } from 'react';
import Card from '../Card/Card';
import './styles.css';

class PokemonContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      pokemon: []
    };
  }
  componentDidMount() {
    const url =
      "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json";
    fetch(url)
      .then(response => response.json())
      .then(data =>
        this.setState({
          pokemon: data.pokemon
        })
      );
  }
  render() {
    console.log('poke', this.state.pokemon);
    let pokemon;

    if (this.state.pokemon) {
      pokemon = this.state.pokemon.map((pokemon, i) => (
        <div key={pokemon.name + i}>
          <Card pokemon={pokemon} />
        </div>
      ));
    }
    return <div className="card-container">{pokemon || "something broke"}</div>;
  }
}

export default PokemonContainer;
