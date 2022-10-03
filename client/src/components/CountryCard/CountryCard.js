
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './CountryCard.module.css'


const CountryCard = (props) => {
	const { country_id, name, continent, flag_img, population, capital } = props
	const tagName = name.length > 15
		?
		<h2 className={styles.cardTitle}>{name.slice(0, 15) + '...'}</h2>
		:
		<h2 className={styles.cardTitle}>{name}</h2>
	return (
		<Link to={`/country/${country_id}`}>
			<section className={styles.card}>
				<figure>
					<img src={flag_img[ 1 ]} alt='country flag' />
				</figure>
				{tagName}
				<div className={styles.description}>
					<p><strong>Continent: </strong>{continent}</p>
					<p><strong>Capital: </strong>{capital.join(', ')}</p>
					<p><strong>Population: </strong>{new Intl.NumberFormat('en-US').format(population)}</p>
				</div>
			</section>
		</Link>
	)
}

export default CountryCard