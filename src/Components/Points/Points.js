import React from 'react'
import styles from './Points.module.css'

const Points = function ({ points }) {
  return (
    <div className={styles.block}>
      <span>Очки : </span>
      <span>{points}</span>
    </div>
  )
}

export default Points
