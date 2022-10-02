
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './CountryCard.module.css'


const CountryCard = (props) => {
	const { country_id, name, continent, flag_img, population } = props
	const tagName = name.length > 18
		?
		<h3 style={{ fontSize: '1.8rem', marginBottom: '1.15em' }}>{name}</h3>
		:
		<h3>{name}</h3>
	return (
		<Link to={`/country/${country_id}`}>
			<section className={styles.card}>
				<figure>
					<img src={flag_img[ 1 ]} alt='country flag' />
				</figure>
				{tagName}
				<div className={styles.description}>
					<p><strong>Continent: </strong>{continent}</p>
					<p><strong>Population: </strong>{new Intl.NumberFormat('en-US').format(population)}</p>
				</div>
			</section>
		</Link>
	)
}

export default CountryCard