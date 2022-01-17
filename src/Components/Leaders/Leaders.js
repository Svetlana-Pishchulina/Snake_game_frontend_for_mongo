import React from 'react'
import styles from './Leaders.module.css'

const Leaders = function ({ leaders }) {
  return (
    <div className={styles.block}>
      <p>лидеры :</p>
      <ul>
        {leaders &&
          leaders.map(({ name, score }) => (
            <li key={name}>
              {name}:{score}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Leaders
