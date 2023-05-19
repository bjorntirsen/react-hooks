// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'

function ErrorMessage({ error }) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
    </div>
  )
}

function PokemonInfo({ pokemonName }) {
  // idle: no request made yet
  // pending: request started
  // resolved: request successful
  // rejected: request failed
  const [pokemon, setPokemon] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [status, setStatus] = React.useState('idle')
  React.useEffect(() => {
    if (!pokemonName) return
    setPokemon(null)
    setStatus('pending')
    async function effect() {
      try {
        const pokemon = await fetchPokemon(pokemonName)
        setPokemon(pokemon)
        setStatus('resolved')
      } catch (error) {
        console.error(error.message)
        setError(error)
        setStatus('rejected')
      }
    }
    effect()
    // return () => {
    //   second
    // }
  }, [pokemonName])
  if (status === 'idle') return 'Submit a pokemon'
  if (status === 'rejected') return <ErrorMessage error={error} />
  if (status === 'pending')
    return (
      <>
        <PokemonInfoFallback name={pokemonName} />
      </>
    )
  return <PokemonDataView pokemon={pokemon} />
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
