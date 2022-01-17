import React, { Component } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import GameField from './Components/GameField/GameField'
import InformationSide from './Components/InformationSide'
import Food from './Components/Food'
import Snake from './Components/Snake'
import PlayButton from './Components/PlayButton'
import LoginForm from './Components/LoginForm'
import Points from './Components/Points'
import Leaders from './Components/Leaders'
import Api from './Services'

const getRandomCoordinates = () => {
  const min = 1
  const max = 98
  const x = Math.floor((Math.random() * (max - min + 1) + min) / 4) * 4
  const y = Math.floor((Math.random() * (max - min + 1) + min) / 4) * 4
  return [x, y]
}

const possiblePoints = [1, 5, 10]
const getRandomPoint = () => {
  return possiblePoints[Math.floor(Math.random() * possiblePoints.length)]
}

const initialState = {
  name: null,
  status: 'PAUSE',
  isGameOver: false,
  food: getRandomCoordinates(),
  foodPoint: getRandomPoint(),
  direction: 'RIGHT',
  points: 0,
  speed: 400,
  level: 1,
  snakeDots: [
    [0, 0],
    [4, 0],
  ],
}

let timerId
class App extends Component {
  state = { ...initialState }

  componentDidMount() {
    document.onkeydown = this.onKeyDown
    Api.fetchLeaders().then((leaders) => this.setState({ leaders }))
  }

  componentWillUnmount() {
    clearInterval(timerId)
    document.onkeydown = null
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.status !== this.state.status) {
      if (this.state.status === 'PAUSE') {
        clearInterval(timerId)
      } else {
        timerId = setInterval(this.moveSnake, this.state.speed)
      }
    }
    if (prevState.snakeDots !== this.state.snakeDots) {
      this.checkIfOutOfBorders()
      this.checkIfCollapsed()
      this.checkIfEat()
    }
    if (
      (prevState.isGameOver !== this.state.isGameOver) &
      (this.state.isGameOver === true)
    ) {
      Api.fetchLeaders().then((leaders) => this.setState({ leaders }))
    }
  }

  onKeyDown = (e) => {
    e = e || window.event
    const { direction } = this.state
    if (e.keyCode === 37 && direction !== 'RIGHT') {
      this.setState({ direction: 'LEFT' })
    }
    if (e.keyCode === 38 && direction !== 'DOWN') {
      this.setState({ direction: 'UP' })
    }
    if (e.keyCode === 39 && direction !== 'LEFT') {
      this.setState({ direction: 'RIGHT' })
    }
    if (e.keyCode === 40 && direction !== 'UP') {
      this.setState({ direction: 'DOWN' })
    }
    return
  }

  moveSnake = () => {
    const dots = [...this.state.snakeDots]
    let head = dots[dots.length - 1]

    switch (this.state.direction) {
      case 'RIGHT':
        head = [head[0] + 4, head[1]]
        break
      case 'LEFT':
        head = [head[0] - 4, head[1]]
        break
      case 'UP':
        head = [head[0], head[1] - 4]
        break
      case 'DOWN':
        head = [head[0], head[1] + 4]
        break
      default:
        break
    }
    dots.push(head)
    dots.shift()
    this.setState({
      snakeDots: dots,
    })
  }

  checkIfOutOfBorders = () => {
    const snake = [...this.state.snakeDots]
    const head = snake[snake.length - 1]
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver()
    }
  }

  checkIfCollapsed = () => {
    const snake = [...this.state.snakeDots]
    const head = snake[snake.length - 1]
    snake.pop()
    snake.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.onGameOver()
      }
    })
  }

  checkIfEat = () => {
    const snake = [...this.state.snakeDots]
    const head = snake[snake.length - 1]
    const food = this.state.food
    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState((prevState) => {
        return {
          food: getRandomCoordinates(),
          foodPoint: getRandomPoint(),
          points: prevState.points + prevState.foodPoint,
        }
      })
      this.enlargeSnake()
      this.increaseSpeed()
    }
  }

  enlargeSnake = () => {
    const newSnake = [...this.state.snakeDots]
    newSnake.unshift([])
    this.setState({ snakeDots: newSnake })
  }

  increaseSpeed = () => {
    if (this.state.points >= this.state.level * 50 && this.state.speed >= 100) {
      this.setState((prevState) => {
        return { speed: prevState.speed - 50, level: prevState.level + 1 }
      })
    }
    return
  }

  onClickButton = () => {
    const status = this.state.status
    const newStatus = status === 'PAUSE' ? 'PLAY' : 'PAUSE'
    this.setState({ status: newStatus, isGameOver: false })
  }

  onGameOver = () => {
    toast(`Игра окончена, набрано ${this.state.points} очков`)

    Api.addScore({ name: this.state.name, score: this.state.points }).then(
      this.setState({
        status: 'PAUSE',
        direction: 'RIGHT',
        points: 0,
        speed: 400,
        level: 1,
        snakeDots: [
          [0, 0],
          [4, 0],
        ],
        isGameOver: true,
      })
    )
  }

  onFormSubmit = (registerForm) => {
    this.setState({
      name: registerForm.name,
    })
  }

  render() {
    const { snakeDots, food, foodPoint, name, status, leaders, points } =
      this.state
    const isLogin = name ? true : false
    return (
      <div className="container">
        <ToastContainer />
        <GameField>
          <Snake snakeDots={snakeDots} />
          <Food foodDot={food} foodPoint={foodPoint} />
        </GameField>
        <InformationSide>
          {!isLogin ? (
            <LoginForm onFormSubmit={this.onFormSubmit} />
          ) : (
            <h2>Удачи, {name}</h2>
          )}
          <PlayButton
            status={status}
            onClickButton={() => this.onClickButton()}
            isLogin={isLogin}
          />
          <Points points={points} />
          <Leaders leaders={leaders} />
        </InformationSide>
      </div>
    )
  }
}

export default App
