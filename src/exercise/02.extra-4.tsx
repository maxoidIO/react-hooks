// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'

function useLocalStorageState<D = unknown>(
  key: string,
  defaultValue?: D,
): [D, Dispatch<SetStateAction<D>>] {
  const [state, setState] = useState(() => {
    const localStorageVal = window.localStorage.getItem(key)
    if (localStorageVal) {
      return JSON.parse(localStorageVal as string)
    }

    return defaultValue
  })

  const prevKeyRef = useRef(key)

  useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}

interface User {
  firstName: string
  lastName: string
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)
  const [, setUser] = useLocalStorageState<User>('user', {
    firstName: 'martin',
    lastName: 'k',
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value)
    setUser({firstName: event.target.value, lastName: 'K'})
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
