import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import * as cityService from '../../services/cities'

function EditCity(city) {
  const location = useLocation()
  const [cityDetails, setCityDetails] = useState({})
  const [formData, setFormData] = useState(location.state.city._id)
  const [validForm, setValidForm] = useState(true)
  const formElement = useRef()


  console.log('location.state: ', location.state.city._id)

  const handleChange = evt => {
    setFormData({...formData, [evt.target.name]: evt.target.value })
  }

  useEffect(() => {
    cityService.getOne(location.state.city._id)
      .then(city => setCityDetails(city))
  }, [])

  useEffect(() => {
		formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
	}, [formData])

  const handleSubmit = evt => {
    evt.preventDefault()
    const placeFormData = new FormData()
    placeFormData.append('desc', formData.desc)
    placeFormData.append('city', formData.city)
    placeFormData.append('state', formData.state)
    placeFormData.append('zip', formData.zip)
    placeFormData.append('population', formData.population)
    placeFormData.append('walkable', formData.walkable)
    // placeFormData.append('photo', formData.photo)
    city.handleUpdateCity(formData)
  }

  const handleDeleteCity = id => {
    cityService.deleteOne(id)
      .then(deletedCity => setCityDetails(city.filter(city => city._id !== deletedCity._id)))
  }

  return (
    <>
      <h1>Edit City </h1>
      <form autoComplete = 'off' ref={formElement} onSubmit={handleSubmit} >
        <div>
          <label htmlFor="city-input">
            City Name
          </label>
          <input
						type="text"
						className="form-control"
						id="city-input"
						name="city"
						value={formData.city}
						onChange={handleChange}
						required
					/>
        </div>
        <div>
          <label htmlFor="state-input">
            State
          </label>
          <input
						type="text"
						className="form-control"
						id="state-input"
						name='state'
						value={formData.state}
						onChange={handleChange}
						required
					/>
        </div>
        <div>
          <label htmlFor="zip-input">
            Zip
          </label>
          <input
						type="text"
						className="form-control"
						id="zip-input"
						name="zip"
						value={formData.zip}
						onChange={handleChange}
						required
					/>
        </div>
        <div>
          <label htmlFor="desc-input">
            Description
          </label>
          <input
						type="text"
						className="form-control"
						id="desc-input"
						name="desc"
						value={formData.desc}
						onChange={handleChange}
						required
					/>
        </div>
        <div>
          <label htmlFor="population-input">
            Population
          </label>
          <input
						type="text"
						className="form-control"
						id="population-input"
						name="population"
						value={formData.population}
						onChange={handleChange}
						required
					/>
        </div>
        <div>
          <label htmlFor="walkable-input">
            Walkable?  
          </label> 
          <input
						type="checkbox"
						className="form-control"
						id="walkable-input"
						name="walkable"
						value={formData.walkable}
						onChange={handleChange}
					/>
        </div>
        <div className="d-grid">
					<button
						type="submit"
						className="btn btn-primary btn-fluid"
						disabled={!validForm}
					>
						Edit City
					</button>
				</div>
      </form> 

      <button
        className="btn btn-sm btn-danger m-left"
        onClick={()=> handleDeleteCity(city.city._id)}
      >
        Delete City
      </button>

    </>
  )
}

export default EditCity