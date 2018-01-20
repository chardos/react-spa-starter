import React from 'react';
import styles from './Spinner.scss';

export default function Spinner() {
    return(
        <div className={styles.SpinnerWrap}>
            <div className={styles.Spinner}>
                <svg className={styles.Circular} viewBox="25 25 50 50">
                    <circle className={styles.Path} cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
                </svg>
            </div>
        </div>
    )
}
