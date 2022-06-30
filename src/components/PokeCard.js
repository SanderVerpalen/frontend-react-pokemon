import React, {useEffect, useState} from "react";
import axios from "axios";

function PokeCard ({ name, url }) {
    const [pokeMon, updatePokeMon] = useState([]);


    useEffect(() => {       // <-- Mount
        async function getPokemon(){
            try{
                const response = await axios.get(url)
                updatePokeMon(response.data)
            }catch (e){
                console.error(e)
            }
        }
        getPokemon();
    },[url])

    return (
        <div className="poke-card">
            <h3>{name}</h3>
            {pokeMon.sprites && <img src={pokeMon.sprites.front_default} alt={`pic-of-${pokeMon.name}`} />}
            {pokeMon.moves && <p>Moves: {pokeMon.moves.length}</p>}
            <p>Weight: {pokeMon.weight}</p>
            <p>Abilities:</p>
            {pokeMon.abilities && pokeMon.abilities.map((a) =>
                <button type="button" key={a.ability.name}>{a.ability.name}</button>)}
        </div>
    )
}

export default PokeCard;