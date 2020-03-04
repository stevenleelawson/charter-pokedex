import React from 'react';
import Card from '../Card/Card';

const PokemonContainer = ({ data }) => {
  let pokemon;
  
  if (data) {
    pokemon = data.map((pokemon, i) => (
      <div key={pokemon.name + i}>
        <Card pokemon={pokemon} />
      </div>
      ))
    }
  return (
    <div>{ pokemon || 'something broke' }</div>
  );
}

export default PokemonContainer;
