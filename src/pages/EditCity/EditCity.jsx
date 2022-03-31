import { useState, useRef, useEffect, Component } from 'react'
import { Link, useLocation, Navigate, useNavigate } from 'react-router-dom'
import * as cityService from '../../services/cityService'
import styles from './EditCity.module.css'

function EditCity({ city, handleDeleteCity, handleUpdateCity }) {
  const location = useLocation()
  const [cityDetails, setCityDetails] = useState({})
  const formElement = useRef()
  const [validForm, setValidForm] = useState(true)
  const [formData, setFormData] = useState({
    _id: location.state.city._id,
    desc: '',
    city: '',
    state: '',
    zip: [],
    population: '',
    walkable: true,
    photo: [],
  })

  const navigate = useNavigate()

  console.log(location.state.city._id)

  useEffect(() => {
    formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)

  }, [formData])

  useEffect(() => {
    cityService.getOne(location.state.city._id)
      .then(city => setCityDetails(city))
  }, [])

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    console.log(formData)
    const cityFormData = new FormData()
    cityFormData.append('photo', formData.photo)
    cityFormData.append('desc', formData.desc)
    cityFormData.append('city', formData.city)
    cityFormData.append('state', formData.state)
    cityFormData.append('zip', formData.zip)
    cityFormData.append('population', formData.population)
    cityFormData.append('walkable', formData.walkable)
    const updatedCity = await handleUpdateCity(location.state.city._id, cityFormData)

    console.log(updatedCity)
    // await handleUpdateCity(formData)

    /// pass location.stat.city.id into placeformdata 
    navigate("/cities")
  }

  const handleChange = evt => {
    let value
    if (evt.target.checked) {
      value = evt.target.checked
    } else {
      value = evt.target.value
    }
    setFormData({ ...formData, [evt.target.name]: value });
  }

  const handleDelete = async (id) => {
    await handleDeleteCity(id)
    navigate('/cities')
  }

  const handleChangePhoto = (evt) => {
    setFormData({ ...formData, photo: evt.target.files[0] })
  }

  // async componentDidMount() {
  //   const cityDetails = await getCityDetails();
  //   this.setState({ results: cityDetails.results });
  //   console.log(this.state.results)
  // }


  return (
    <>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h1 className="text-xl font-medium leading-6 text-gray-900">Edit a city</h1>
            <br></br>
            <p className="mt-1 text-md text-gray-600">Current info</p>
            <p className="mt-1 text-md text-gray-600">{location.state.city.city}</p>
            <p className="mt-1 text-md text-gray-600">{location.state.city.population}</p>
            <p className="mt-1 text-md text-gray-600">{location.state.city.desc}</p>
            <p className="mt-1 text-md text-gray-600">{location.state.city.walkable}</p>
            <br></br>
            <Link to="/places" className="underline underline-offset-2 hover:font-bold">Cancel</Link>
          </div>
        </div>


        <div className="mt-5 md:mt-0 md:col-span-2">
          <form autoComplete='off' ref={formElement} onSubmit={handleSubmit}>
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="grid grid-cols-6 px-4 py-5 gap-6 bg-white sm:p-6">

                <div className="col-span-4">
                  <label htmlFor="city-input" className="block text-sm font-medium text-gray-700">City name
                  </label>
                  <input
                    type="text"
                    className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    id="city-input"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    placeholder={location.state.city.city}
                  />
                </div>

                <div className="col-span-3">
                  <label htmlFor="state-input" className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <input
                    type="text"
                    className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    id="state-input"
                    name='state'
                    value={formData.state}
                    onChange={handleChange}
                    required
                    placeholder="required"
                  />
                </div>

                <div className="col-span-3">
                  <label htmlFor="zip-input" className="block text-sm font-medium text-gray-700">
                    Zip
                  </label>
                  <input
                    type="text"
                    className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    id="zip-input"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    required
                    placeholder="required"
                  />
                </div>

                <div className="col-span-3">
                  <label htmlFor="population-input" className="block text-sm font-medium text-gray-700" >
                    Population
                  </label>
                  <input
                    type="text"
                    className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    id="population-input"
                    name="population"
                    value={formData.population}
                    onChange={handleChange}
                    required
                    placeholder="required"
                  />
                </div>

                <div className="col-span-2">
                  <label htmlFor="walkable-input" className="block text-sm font-medium text-gray-700">
                    Walkable?
                  </label>
                  <select
                    name="walkable"
                    id="walkable-input"
                    value={formData.walkable}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  >
                    <option key="1" value={true} defaultValue={true}>Yes</option>
                    <option key="0" value={false}>No</option>
                  </select>
                </div>

                <div className="col-span-6">
                  <label htmlFor="desc-input" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    type="text"
                    className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    id="desc-input"
                    name="desc"
                    value={formData.desc}
                    onChange={handleChange}
                    required
                    rows={3}
                    placeholder="required"
                    defaultValue={''}
                  />
                  <p className="mt-2 text-sm text-gray-500"></p>
                </div>

                <div className="col-span-6">
                  <button
                    type="submit"
                    className="block w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-500 disabled:bg-gray-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    onClick={(e) => handleSubmit(e, location.state.city._id)}
                    onChange={handleChange}
                    disabled={!validForm}
                  >
                    Submit
                  </button>
                </div>
                </div>
              </div>
          </form>
        </div>
      </div>

      <div className={styles.cityContainer} id='cityInfo'>
        <h2>City info currently:</h2><br />
        {location.state.city._id ?
          <>

            <h2 className='city-details'>{location.state.city.city}</h2>
            <h3>{location.state.city.desc}</h3>
            <h4>{location.state.city.population}</h4>
            <h4>Walkable?  {location.state.city.walkable ? 'you can walk!' : 'get a bike'}</h4>
          </>
          :
          <>
            <h2>Loading City Details...</h2>
          </>
        }
      </div>
      <br />
      <br />
      <button
        className="btn btn-sm btn-danger m-left"
        onClick={() => handleDelete(location.state.city._id)}
      >
        Delete City
      </button>

    </>
  )
}

export default EditCity