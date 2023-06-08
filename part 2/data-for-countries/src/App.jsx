import { useEffect } from 'react';
import { useState } from 'react'
import CountriesApi from './service/CountriesApi';
import Filter from './components/Filter';
import Country from './components/Country';
import CountryList from './components/CountryList';

function App() {
  const [filter, setFilter] = useState('');
  const [countryList, setCountryList] = useState([])
  if (!countryList) return null
  // const [countriesToShow, setCountriesToShow] = useState([])


  useEffect(() => {
    CountriesApi.getAllCountries().then(data => {
      setCountryList(countryList.concat(data))
    })
  }, [])

  const handleFilterOnChange = (event) => {
    setFilter(event.target.value)
  }

  const handleCountryShowClick = () => {

  }

  const countriesToShow = countryList.filter( item => item['name']['common'].toLowerCase().includes(filter.toLowerCase()))


  return (
    <>
      <Filter filter={filter} handleFilterOnChange={handleFilterOnChange}/>
      <br />
      <h3>List of Countries</h3>
      <div>
        {filter === ''? <p>Please type on the search box to show results</p>:
         countriesToShow.length > 10 ? <p>[Too many matches, specify another fitler]</p>:
         countriesToShow.length === 1 ? 
         <Country name={countriesToShow[0]['name']['common']} capital={countriesToShow[0]['capital'][0]} area={countriesToShow[0]['area']} lang={countriesToShow[0]['languages']} flag={countriesToShow[0]['flags']['png']}/>
         :
         <CountryList countriesToShow={countriesToShow} handleCountryShowClick={handleCountryShowClick}/>
        }
      </div>
      <div></div>
      

    </>
  )
}

export default App
