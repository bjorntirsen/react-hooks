// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {useEffect} from 'react'

function useLocalStorageState(identifyer, initialValue) {
  const [state, setState] = React.useState(
    () => JSON.parse(window.localStorage.getItem(identifyer)) || initialValue,
  )

  useEffect(() => {
    window.localStorage.setItem(identifyer, JSON.stringify(state))
  }, [state, identifyer])

  function stringifyAndSetState(newState) {
    setState(JSON.stringify(newState))
  }

  return [state, stringifyAndSetState]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)
  // const [name, setName] = React.useState(
  //   () => window.localStorage.getItem('name') || initialName,
  // )

  // useEffect(() => {
  //   window.localStorage.setItem('name', name)
  // }, [name])

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
