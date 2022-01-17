import React from 'react'
import styles from './GameField.module.css'

function GameField({ children }) {
  return (
    <div className={styles.gameArea}>
      {children}
    </div>
  )
}

export default GameField
