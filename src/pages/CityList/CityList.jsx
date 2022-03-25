import { useState, useRef, useEffect } from 'react'
import styles from './CityList.module.css'
import CityCard from '../../components/CityCard/CityCard'

const CityList = props => {

  return (  
    <>
      <h1>Cities</h1>
      <div className={styles.container}>
        {props.cities.map(city => ( 
          <CityCard 
            key={city.name}
            city={city}
            // insert photo link
            handleDeleteCity={props.handleDeleteCity}
            /> 
        ))}
      </div>
    </>
  );
}

export default CityList