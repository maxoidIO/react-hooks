// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React, {useEffect, useState} from 'react'
import {ErrorBoundary, FallbackProps} from 'react-error-boundary'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  fetchPokemon,
  PokemonDataView,
  PokemonForm,
  PokemonInfoFallback,
} from '../pokemon'
import {Pokemon} from '../typings'

type Status = 'idle' | 'pending' | 'resolved' | 'rejected'

interface State {
  pokemon: Pokemon | null
  error: Error | null
  status: Status
}

function ErrorBoundaryFallback({error, resetErrorBoundary}: FallbackProps) {
  if (!error) return null

  return (
    <div role="alert">
      Something went wrong! 💣💥 <div>{error.message}</div>
      <div>
        Let's <button onClick={resetErrorBoundary}>try again</button>
      </div>
    </div>
  )
}

/*
interface ErrorBoundaryState {
  error: Error | null
}

class ErrorBoundary extends React.Component<
  {
    FallbackComponent: React.ComponentType<{ error: Error }>
  },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    error: null,
  }

  // componentDidCatch(error: Error) {
  //   this.setState({error})
  // }

  static getDerivedStateFromError(error: Error) {
    return {error}
  }

  render() {
    const {error} = this.state

    if (error) {
      return <this.props.FallbackComponent error={error} />
    }

    return this.props.children
  }
}*/

function PokemonInfo({pokemonName}: {pokemonName: string}) {
  const [state, setState] = useState<State>({
    pokemon: null,
    error: null,
    status: 'idle',
  })

  useEffect(() => {
    const effectPokemon = async () => {
      if (!pokemonName) return

      // kinda loading...
      setState({...state, status: 'pending'})

      try {
        const data = await fetchPokemon(pokemonName)
        setState({pokemon: data, error: null, status: 'resolved'})
      } catch (e) {
        setState({...state, error: e, status: 'rejected'})
      }
    }

    effectPokemon()
  }, [pokemonName])

  if (state.status === 'idle') {
    return <div>Submit a pokemon</div>
  }

  if (state.status === 'pending') {
    return (
      <>
        <PokemonInfoFallback name={pokemonName} />
      </>
    )
  }

  if (state.status === 'rejected' && state.error) {
    throw state.error
  }

  return <PokemonDataView pokemon={state.pokemon as Pokemon} />
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName: string) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary
          FallbackComponent={ErrorBoundaryFallback}
          // key={pokemonName}
          resetKeys={[pokemonName]}
          onReset={() => setPokemonName('')}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
