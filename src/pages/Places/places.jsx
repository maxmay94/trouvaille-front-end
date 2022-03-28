import { useState, useEffect } from 'react'
import * as placeService from '../../services/placeService.js'
import { Link } from 'react-router-dom'
import PlaceCard from '../../components/PlaceCard/PlaceCard'
import styles from './places.module.css'

const Places = (props) => {
  const [places, setPlaces] = useState([])

  useEffect(()=> {
    placeService.getAllPlaces()
    .then(places => setPlaces(places))
  }, [])

  return (
    <>
      <h1></h1>
      <div className={styles.container}>
        {places.length ? 
          <>
            {places.map((place, i)=>
              <PlaceCard 
                key={place._id + i}
                place={place}
              />
              // <p key={place._id}>{place.name}</p>
            )}
          </>
        :
        <div>
          <p>No places yet</p>
          <Link to="/places/add">Add a Place</Link>
        </div>
        }
      </div>
    </>
  )
}
 
export default Places