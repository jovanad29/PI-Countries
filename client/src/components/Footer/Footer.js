import React from 'react'
import styles from './Footer.module.css'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'

export const Footer = () => {
    return (
        <footer>
            <div className={styles.message}>
                <p>
                    Developed with <span className={styles.red}>❤</span> by Jovana Davalillo
                </p>
            </div>
            <div className={styles.social}>
                <a href='https://www.linkedin.com/in/jovana-davalillo/' target='_blank' rel='noreferrer'><FaLinkedinIn /></a>
                <a href='https://github.com/jovanad29' target='_blank' rel='noreferrer'><FaGithub /></a>
            </div>
        </footer>
    )
}
