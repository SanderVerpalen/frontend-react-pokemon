import React, {useEffect, useState} from 'react';
import PokeCard from "./components/PokeCard";
import './App.css';
import axios from "axios";

function App() {
    const [pokeMon, updatePokeMon] = useState([])
    const [pokeData, updatePokeData] = useState('')
    const [url, updateUrl] = useState(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`)


    function prevPage() {
        updateUrl(pokeData.previous)
    }

    const nextPage = () => {
        updateUrl(pokeData.next)
    }

    useEffect(() => {       // <-- Mount
        async function getPokemon() {
            try {
                const response = await axios.get(url)
                updatePokeMon(response.data.results)
                updatePokeData(response.data)
            } catch (e) {
                console.error(e)

            }
        }

        getPokemon();
    }, [url])


    return (

        <div className="pagina">

            <header><h1>Pokemon</h1></header>
            <nav>
                <button
                    onClick={prevPage}
                    disabled={pokeData.previous === null}
                >vorige
                </button>
                <button
                    onClick={nextPage}
                    disabled={pokeData.next === null}
                >volgende
                </button>
            </nav>
            <main>
                {pokeMon !== [] && pokeMon.map((pokemon) =>

                    <PokeCard
                        name={pokemon.name}
                        url={pokemon.url}
                        key={pokemon.name}
                    />
                )}
            </main>

        </div>

    );
}

export default App;
