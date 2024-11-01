import React from 'react';
import styles from './Spinner.module.scss';

const Spinner = () => (
  <div className={styles.spinnerWrapper}>
    <div className={styles.spinner}>
      <div className={styles.doubleBounce1}></div>
      <div className={styles.doubleBounce2}></div>
    </div>
  </div>
);

export default Spinner;
