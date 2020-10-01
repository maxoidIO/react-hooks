// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04-classes.js

import React from 'react'
import {Square} from '../typings'

// If you'd rather practice refactoring a class component to a function
// component with hooks, then go ahead and do this exercise.

// 🦉 You've learned all the hooks you need to know to refactor this Board
// component to hooks. So, let's make it happen!

interface State {
  squares: Square[]
}

class Board extends React.Component<{}, State> {
  state = {
    squares:
      JSON.parse(window.localStorage.getItem('squares') as string) ||
      Array(9).fill(null),
  }

  selectSquare(square: number) {
    const {squares} = this.state
    const nextValue = calculateNextValue(squares)
    if (calculateWinner(squares) || squares[square]) {
      return
    }
    const squaresCopy = [...squares]
    squaresCopy[square] = nextValue
    this.setState({squares: squaresCopy})
  }
  renderSquare = (i: number) => (
    <button className="square" onClick={() => this.selectSquare(i)}>
      {this.state.squares[i]}
    </button>
  )

  restart = () => {
    this.setState({squares: Array(9).fill(null)})
    this.updateLocalStorage()
  }

  componentDidMount() {
    this.updateLocalStorage()
  }

  componentDidUpdate(_prevProps: {}, prevState: State) {
    if (prevState.squares !== this.state.squares) {
      this.updateLocalStorage()
    }
  }

  updateLocalStorage() {
    window.localStorage.setItem('squares', JSON.stringify(this.state.squares))
  }

  render() {
    const {squares} = this.state
    const nextValue = calculateNextValue(squares)
    const winner = calculateWinner(squares)
    let status = calculateStatus(winner, squares, nextValue)

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <button className="restart" onClick={this.restart}>
          restart
        </button>
      </div>
    )
  }
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  )
}

function calculateStatus(
  winner: string | null,
  squares: Square[],
  nextValue: string,
) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

function calculateNextValue(squares: Square[]) {
  const xSquaresCount = squares.filter(r => r === 'X').length
  const oSquaresCount = squares.filter(r => r === 'O').length
  return oSquaresCount === xSquaresCount ? 'X' : 'O'
}

function calculateWinner(squares: Square[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
