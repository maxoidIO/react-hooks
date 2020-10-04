// useRef and useEffect: DOM interaction
// http://localhost:3000/isolated/exercise/05.js

import React, {useEffect, useRef} from 'react'
import VanillaTilt from 'vanilla-tilt'

interface VanillaTiltElement {
  vanillaTilt: {
    destroy: Function
  }
}

function Tilt({children}: {children: React.ReactChild}) {
  const ref = useRef(null)

  useEffect(() => {
    const tiltEl: VanillaTiltElement | null = ref.current

    if (tiltEl) {
      VanillaTilt.init(tiltEl, {
        max: 30,
        speed: 300,
        glare: true,
        'max-glare': 0.5,
      })

      // componentWillUnmount: clear binding
      return () => tiltEl!.vanillaTilt.destroy()
    }
  }, [])

  return (
    <div className="tilt-root" ref={ref}>
      <div className="tilt-child">{children}</div>
    </div>
  )
}

function App() {
  return (
    <Tilt>
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
  )
}

export default App
