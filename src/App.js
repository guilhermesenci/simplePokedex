import React, { useState } from 'react';
import axios from 'axios'

import './App.css'

export function App() {
  const [pokemon, setPokemon] = useState("pikachu");
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemontype, setPokemonType] = useState("");

  const getPokemon = async () => {
    const toArray = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      const res = await axios.get(url);
      toArray.push(res.data);
      setPokemonType(res.data.types[0].type.name);
      setPokemonData(toArray);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase())
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    getPokemon();
  }

  return (
    <div className="App">
      <h1>Pokemons</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Nome do Pokemon"
          />
        </label>
      </form>
      {pokemonData.map((data) => {
        return (
          <div className="container" key={data.id}>
            <img src={data.sprites["front_default"]} alt="pokemon de frente" />
            <img src={data.sprites["back_default"]} alt="pokemon de costas" />
            <div className="divTable">
              <div className="divTableBody">
                <div className="divTableRow">
                  <div className="title">Tipo:</div>
                  <div className='divTableCell'>{pokemontype}</div>
                </div>
                <div className="divTableRow">
                  <div className="title">Tamanho:</div>
                  <div className="divTableCell">{Math.round(data.height * 10)} cm</div>
                </div>
                <div className="divTableRow">
                  <div className="title">Peso:</div>
                  <div className="divTableCell">{data.weight} kg</div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default App;
