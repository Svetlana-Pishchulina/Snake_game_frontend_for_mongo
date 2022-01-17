import React from 'react'

import styles from './Food.module.css'

function Food(props) {
  let color
  if (props.foodPoint === 1) {
    color = 'rgb(255, 215, 0)'
  }
  if (props.foodPoint === 5) {
    color = 'rgb(220, 20, 60)'
  }
  if (props.foodPoint === 10) {
    color = 'rgb(139, 0, 0)'
  }

  const style = {
    left: `${props.foodDot[0]}%`,
    top: `${props.foodDot[1]}%`,
    backgroundColor: color,
  }
  return <div className={styles.snakeFood} style={style}></div>
}

export default Food
