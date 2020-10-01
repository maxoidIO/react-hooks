// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import React, {useState} from 'react'

interface Props {
  initialName?: string
}

function Greeting({initialName}: Props) {
  const [name, setName] = useState(initialName)

  function handleChange({target}: React.ChangeEvent<HTMLInputElement>) {
    setName(target.value)
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
  return <Greeting initialName="Martin" />
}

export default App
