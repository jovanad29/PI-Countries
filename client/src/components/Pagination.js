
import React from 'react'
import styles from '../assets/css/Pagination.module.css'

function Pagination({nPage, setPage, nPages, lPage}) {
    const nextPage = () => {
        if (nPage < nPages) {
            setPage(nPage + 1)
        }
        return false
    }
    const prevPage = () => {
        if (nPage > 1) {
            setPage(nPage - 1)
        }
        return false
    }
    const firstPage = () => {
        setPage(1)
    }
    const lastPage = () => {
        setPage(lPage)
    }
    return (
        <div className={styles.container}>
            <button className={styles.doubleArrow} onClick={firstPage}>
                {"<<"}
            </button>
            <button onClick={prevPage}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="arcs"><path d="M15 18l-6-6 6-6"></path></svg>
            </button>
            <span>{nPage} / {nPages}</span>
            <button onClick={nextPage}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="arcs"><path d="M9 18l6-6-6-6"></path></svg>
            </button>
            <button className={styles.doubleArrow} onClick={lastPage}>
                {">>"}
            </button>
        </div>
    )
}

export default Pagination