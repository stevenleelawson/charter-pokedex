import React from 'react';

const Card = ({ pokemon }) => {
  console.log('pokemon', pokemon)
  return (
    <div>
      <h1>{pokemon.name}</h1>
      <p>id: {pokemon.id}</p>
      <img src={pokemon.img} alt={pokemon.name} />
    </div>
  );
}

export default Card;
