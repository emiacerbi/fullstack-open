import { useEffect, useState } from 'react'
import { countryService } from '../services/countries'

const useCountry = () => {
  const [countryName, setCountryName] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [searchedCountry, setSearchedCountry] = useState(null)

  useEffect(() => {
    if (countryName) {
      countryService.getByFullName(countryName).then((response) =>
        response.json().then((data) => {
          data.length === 1
            ? setSearchedCountry(data[0])
            : setSearchedCountry('not found')
        })
      )
    }
  }, [countryName])

  const handleChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setCountryName(inputValue)
  }

  return {
    handleSearch,
    handleChange,
    searchedCountry,
    inputValue,
  }
}

export default useCountry
