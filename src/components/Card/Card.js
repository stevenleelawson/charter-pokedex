import React from 'react';
import './styles.css';

const Card = ({ pokemon }) => {
  console.log('pokemon', pokemon)
  return (
    <div className="card">
      <h1>{pokemon.name}</h1>
      <p>id: {pokemon.id}</p>
      <img src={pokemon.img} alt={pokemon.name} />
    </div>
  );
}

export default Card;
