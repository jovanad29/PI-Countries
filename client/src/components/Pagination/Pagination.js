
import React from 'react'
import styles from './Pagination.module.css'
import { BiArrowToLeft, BiArrowToRight, BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';

function Pagination({ nPage, setPage, nPages }) {
    const nextPage = (e) => {
        if (nPage < nPages) {
            setPage(nPage + 1)
        } else {
            return false
        }
    }
    const prevPage = (e) => {
        if (nPage > 1) {
            setPage(nPage - 1)
        } else {
            return false
        }
    }
    const firstPage = (e) => {
        setPage(1)
    }
    const lastPage = () => {
        setPage(nPages)
    }
    return (
        <div className={styles.container}>
            <button className={styles.pgBtn} onClick={firstPage} disabled={nPage === 1 ? true : false}>
                <BiArrowToLeft />
            </button>
            <button className={styles.pgBtn} onClick={prevPage} disabled={nPage === 1 ? true : false}>
                <BiLeftArrowAlt />
            </button>
            <span>{nPage} / {nPages}</span>
            <button className={styles.pgBtn} onClick={nextPage} disabled={nPage === nPages ? true : false}>
                <BiRightArrowAlt />
            </button>
            <button className={styles.pgBtn} onClick={lastPage} disabled={nPage === nPages ? true : false}>
                <BiArrowToRight />
            </button>
        </div>
    )
}

export default Pagination