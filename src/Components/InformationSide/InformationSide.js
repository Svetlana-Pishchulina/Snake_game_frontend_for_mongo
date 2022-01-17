import React from 'react'

import styles from './InformationSide.module.css'
function InformationSide({ children }) {
  return <div className={styles.container}>{children}</div>
}

export default InformationSide
