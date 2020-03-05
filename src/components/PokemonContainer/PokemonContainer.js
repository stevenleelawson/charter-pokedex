import React, { Component } from 'react';
import Card from '../Card/Card';
import './styles.css';

import SearchInput, { createFilter } from 'react-search-input';

const KEYS_TO_FILTERS = ['name'];

class PokemonContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      pokemon: []
    };
    this.searchUpdated = this.searchUpdated.bind(this);
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
  searchUpdated(term) {
    console.log('mordor', term)
    this.setState({ searchTerm: term });
  }
  render() {
    const filteredPokemon = this.state.pokemon.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
      );
      console.log("poke", filteredPokemon);

    let pokemon;

    if (this.state.pokemon) {
      pokemon = filteredPokemon.map((pokemon, i) => (
        <div key={pokemon.name + i}>
          <Card pokemon={pokemon} />
        </div>
      ));
    }
    return (
      <div className="card-container">
        <SearchInput className="search-input" onChange={this.searchUpdated} />
        {pokemon || "something broke"}
      </div>
    );
  }
}

export default PokemonContainer;
