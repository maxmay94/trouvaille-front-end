// import { useState, useRef, useEffect } from 'react'
import AddItinerary from '../../components/AddItinerary/AddItinerary'
import * as cityService from '../../services/cities'
import { useState, useEffect } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import { MapBox } from '../../components/MapBox/MapBox'

const CityId = (props) => {
  const [cityDetails, setCityDetails] = useState({})
  let location = useLocation()

  // const {} = useParams()

  useEffect(() => {
    cityService.getOne(location.state.city._id)
      .then(city => setCityDetails(city))
  }, [])

  return (
    <>
      <div className='mapbox-container'>

      </div>
      <div className='places-container'>
        
      </div>
      <div className='city-container'>
        {location.state.city._id ?
          <>

            <h2 className='city-details'>{location.state.city.city}</h2>
            <h3>{location.state.city.desc}</h3>
            <h4>{location.state.city.population}</h4>
            <h4>Walkable? {location.state.city.walkable ? 'you can walk!' : 'get a bike'}</h4>
          </>
          :
          <>
            <h2>Loading City Details...</h2>
          </>
        }
      </div>
      <div className='itinerary-container'>

      </div>
      <MapBox city={location.state.city.city} state={location.state.city.state} />
    </>
  );
}

export default CityId;