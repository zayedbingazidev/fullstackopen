import axios from "axios";

const getAllCountries = () => {
      const request = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      return request.then(response => response.data)
}

const getCountry = (name) => {
      const request = axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      return request.then(response => response.data)
}

const getWeather = (capital) => {
      const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${import.meta.env.VITE_REACT_APP_API_KEY}`)
      return request.then(response => response.data)
}

export default { getAllCountries, getCountry, getWeather }