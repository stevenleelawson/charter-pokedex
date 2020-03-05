import React, { Component } from 'react';
import Card from '../Card/Card';
import './styles.css';

import SearchInput, { createFilter } from 'react-search-input';
import MultipleSelect from "react-multiple-select-dropdown";
import "react-multiple-select-dropdown/dist/index.css";

const KEYS_TO_FILTERS = ['name'];

class PokemonContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      pokemon: [],
      selectedTypeFilter: '',
    };
    this.searchUpdated = this.searchUpdated.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
  handleChange(event) {
    console.log('eventz', event.target.value)
    this.setState({
      selectedTypeFilter: event.target.value
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
        return acc;
      },[])

      console.log('typefilt',typeFilteredPokemon)
      let pokemon;
      
      if (this.state.pokemon) {
        pokemon = filteredPokemon.map((pokemon, i) => (
          <div key={pokemon.name + i}>
          <Card pokemon={pokemon} />
        </div>
      ));
    }

      if (this.state.pokemon && this.state.selectedTypeFilter) {
        pokemon = typeFilteredPokemon.map((pokemon, i) => (
          <div key={pokemon.name + i}>
          <Card pokemon={pokemon} />
        </div>
      ));
    }

    console.log("poke", pokemon);
    const typeOptions = [
      { value: 'Grass', label: 'Grass' },
      { value: 'Poison', label: 'Poison' },
      { value: 'Fire', label: 'Fire' },
      { value: 'Flying', label: 'Flying' },
      { value: 'Water', label: 'Water' },
      { value: 'Normal', label: 'Normal' },
      { value: 'Bug', label: 'Bug' },
    ]
    return (
      <div>
        <SearchInput className="search-input" onChange={this.searchUpdated} />
        <div className="type-select">
          <p>Filter by type</p>
          {/* <MultipleSelect
            options={typeOptions}
            selectedOptions={[]}
            onChange={this.handleChange}
            defaultValue="click"
            theme="dark"
          /> */}
          <select onChange={this.handleChange}>
            <option>Select a Type</option>
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
