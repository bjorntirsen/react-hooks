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
  const [state, setState] = React.useState({
    status: 'idle',
    pokemon: null,
    error: null,
  })
  const { status, pokemon, error } = state
  React.useEffect(() => {
    if (!pokemonName) return
    setState({ status: 'pending' })
    async function effect() {
      try {
        const pokemon = await fetchPokemon(pokemonName)
        setState({ status: 'resolved', pokemon })
      } catch (error) {
        setState({ status: 'rejected', error })
      }
    }
    effect()
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
