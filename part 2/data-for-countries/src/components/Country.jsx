import { useEffect, useState } from "react"
import CountriesApi from "../service/CountriesApi"

const Country = ({name, capital, area, lang, flag, lat, lon}) => {
      const [setWeather, setSetWeather] = useState({})
      useEffect(() => {
            CountriesApi.getWeather(capital).then(data => {
               setSetWeather({temp: data.main.temp, icon: data.weather[0].icon, wind: data.wind.speed})
            })
      }, [])
      return <>
                  <h2>{name}</h2>
                  <p>Capital: {capital}</p>
                  <p>Area: {area}</p>
                  <ul>{
                  Object.values(lang).map((item, i) => <li key={i}>{item}</li>)
                  }</ul>
                  <img src={flag} alt="flag" />
                  <h2>Weather in {capital}</h2>
                  <p>Temperature {(setWeather.temp - 273.15).toFixed(2)} Celcius</p>
                  <img src={`https://openweathermap.org/img/wn/${setWeather.icon}@2x.png`} alt="" />
                  <p>Wind {setWeather.wind} m/s</p>

            </>
}

export default Country