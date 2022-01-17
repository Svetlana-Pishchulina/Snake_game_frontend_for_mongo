import React from 'react'

import styles from './PlayButton.module.css'

function PlayButton({ status, onClickButton, isLogin }) {
  return (
    <button
      className={styles.button}
      type="button"
      onClick={onClickButton}
      disabled={!isLogin}
    >
      {status === 'PAUSE' ? 'СТАРТ' : 'ПАУЗА'}
    </button>
  )
}
export default PlayButton
