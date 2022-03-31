import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, Navigate } from 'react-router-dom'
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'
import styles from './SearchBar.module.css'

const SearchBar = ({ placeholder, data }) => {
  // const navigate = useNavigate()
  const [filteredData, setFilteredData] = useState([])
  const [searchInput, setSearchInput] = useState("")

  const handleFilter = (evt) => {
    const searchWord = evt.target.value
    setSearchInput(searchWord)
    const newFilter = data.filter((place) => {
      return place.name.toLowerCase().includes(searchWord.toLowerCase())
    })
    searchWord ? setFilteredData(newFilter) : setFilteredData([])
    // navigate(`/places/${place._id}`)
    console.log('TEST SEARCH', searchWord)
  }

  const clearInput = () => {
    setFilteredData([])
    setSearchInput("")
  }

  return (
    <div className={styles.search}>
      <div className={styles.searchInputs}>
        <input className={styles.inputText} type="text" value={searchInput} placeholder={placeholder} onChange={handleFilter} />
        <span>{filteredData.length ?
          <FontAwesomeIcon
            className={styles.clearBtn} icon={faXmark}
            onClick={clearInput} />
          :
          <FontAwesomeIcon className={styles.SearchIcon} icon={faMagnifyingGlass} />
        }
        </span>
      </div>
      {filteredData.length !== 0 && (
        <div className={styles.searchResult}>
          {filteredData.map((place) => {
            console.log(place._id)
            return (
              <Link to={`/places/${place._id}`} key={place._id} state={{place}} className={styles.resultItem}>
                <p>{place.name} <span className={styles.placeType}>{place.type}</span></p>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SearchBar;