import { useState } from "react"
import Country from "./Country"

const CountryList = ({countriesToShow}) => {
      const [buttonToToogle, setButtonToToogle] = useState(null)
      
      return <>
            {         
                  countriesToShow.map((item,i) => 
                        <div key={i}>
                              {item['name']['common']} <button onClick={() => setButtonToToogle(i)}>Show</button>
                              {buttonToToogle === i ? <Country name={item['name']['common']} capital={item['capital'][0]} area={item['area']} lang={item['languages']} flag={item['flags']['png']}/>:<></>}
                        </div>
                  )
            }
      </>
}

export default CountryList