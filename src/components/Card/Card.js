import React from 'react';
import './styles.css';

const Card = ({ pokemon }) => {
  const types = pokemon.type.map(type => (
    <p>{type}</p>
  ));
  const weaknesses = pokemon.weaknesses.map(weakness => <p>{weakness}</p>);
  return (
    <div className="card">
      <h1>{pokemon.name}</h1>
      <p>id: {pokemon.id}</p>
      <img src={pokemon.img} alt={pokemon.name} />
      <div className="details-container">
        <div>
          <h6>Types:</h6>
          {types || ""}
        </div>
        <div>
          <h6>Weaknesses:</h6>
          {weaknesses || ""}
        </div>
      </div>
    </div>
  );
}

export default Card;
