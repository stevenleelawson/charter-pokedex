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
      pokemon: [],
      selectedTypeFilter: '',
      selectedWeaknessFilter: '',
    };
    this.searchUpdated = this.searchUpdated.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleChangeWeakness = this.handleChangeWeakness.bind(this);
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
    this.setState({ searchTerm: term });
  }
  handleChangeType(event) {
    this.setState({
      selectedTypeFilter: event.target.value
    })
  }
  handleChangeWeakness(event) {
    this.setState({
      selectedWeaknessFilter: event.target.value
    })
  }
  render() {
    const filteredPokemon = this.state.pokemon.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
      );
      
      const typeFilteredPokemon = filteredPokemon.reduce((acc, poke) => {
        poke.type.forEach(type => {
          if (type === this.state.selectedTypeFilter) {
            acc.push(poke)
          }
        })
        poke.weaknesses.forEach(type => {
          if (type === this.state.selectedWeaknessFilter) {
            acc.push(poke)
          }
        })
        return acc;
      },[])

      let pokemon;
      
      if (this.state.pokemon) {
        pokemon = filteredPokemon.map((pokemon, i) => (
          <div key={pokemon.name + i}>
          <Card pokemon={pokemon} />
        </div>
      ));
    }

      if (
        this.state.pokemon
        && this.state.selectedTypeFilter
        || this.state.selectedWeaknessFilter
        ) {
        pokemon = typeFilteredPokemon.map((pokemon, i) => (
          <div key={pokemon.name + i}>
          <Card pokemon={pokemon} />
        </div>
      ));
    }

    return (
      <div>
        <p>Search by Name:</p>
        <SearchInput className="search-input" onChange={this.searchUpdated} />
        <div className="type-select">
          <p>Filter by type or Weakness</p>
          <select onChange={this.handleChangeType}>
            <option>Select a Type</option>
            <option value="Fire">Fire</option>
            <option value="Water">Water</option>
            <option value="Grass">Grass</option>
            <option value="Poison">Poison</option>
            <option value="Ground">Ground</option>
          </select>
          <select onChange={this.handleChangeWeakness}>
            <option>Select a Weakness</option>
            <option value="Fire">Fire</option>
            <option value="Water">Water</option>
            <option value="Grass">Grass</option>
            <option value="Poison">Poison</option>
            <option value="Ground">Ground</option>
          </select>
        </div>
        <div className="card-container">{pokemon || "something broke"}</div>
      </div>
    );
  }
}

export default PokemonContainer;
