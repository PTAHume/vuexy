// hooks/useFormDefaults.js
import { useEffect } from "react"

const useFormDefaults = (setValue, watch, countries, cities, redux, id, airports) => {

  const departureCountry = watch("departure_country")
  const arrivalCountry = watch("arrival_country")
  const departureCity = watch("departure_city")
  const arrivalCity = watch("arrival_city")

  useEffect(() => {

    const setValues = () => {
      if (countries && redux.dealData && redux.dealData[id]) {
        const departureCountry = countries.find(
          (country) => country.id === redux.dealData[id].departure_country_id
        )

        setValue("departure_country", departureCountry?.id || "")
      }
      if (countries && redux.dealData && redux.dealData[id]) {
        const arrivalCountry = countries.find(
          (country) => country.id === redux.dealData[id].arrival_country_id
        )
        setValue("arrival_country", arrivalCountry?.id || "")
      }

      if (cities && redux.dealData && redux.dealData[id]) {
        const departureCity = cities.find(
          (city) => city.id === redux.dealData[id].departure_city_id
        )
        setValue("departure_city", departureCity?.id || "")
      }

      if (cities && redux.dealData && redux.dealData[id]) {
        const arrivalCity = cities.find(
          (city) => city.id === redux.dealData[id].arrival_city_id
        )
        setValue("arrival_city", arrivalCity?.id || "")
      }

      if (airports && redux.dealData && redux.dealData[id]) {
        const arrivalAirport = airports.find(
          (airport) => airport.id === redux.dealData[id].arrival_airport_id
        )
        setValue("arrival_airport", arrivalAirport?.id || "")
      }

      if (airports && redux.dealData && redux.dealData[id]) {
        const departureAirport = airports.find(
          (airport) => airport.id === redux.dealData[id].departure_airport_id
        )
        setValue("departure_airport", departureAirport?.id || "")
      }
    }
    setValues()
  }, [countries, airports, cities, redux.dealData, id, setValue])

  useEffect(() => {
    if (cities && departureCountry) {
      const departureCity = cities.find(
        (city) => city.country_id === departureCountry
      )
      setValue("departure_city", departureCity?.id || "")
    }
  }, [cities, departureCountry, setValue])

  useEffect(() => {
    if (cities && arrivalCountry) {
      const arrivalCity = cities.find(
        (city) => city.country_id === arrivalCountry
      )
      setValue("arrival_city", arrivalCity?.id || "")
    }
  }, [cities, arrivalCountry, setValue])


  useEffect(() => {
    if (airports && departureCity) {
      const departureAirport = airports.find(
        (airport) => airport.city_id === departureCity
      )
      setValue("departure_airport", departureAirport?.id || "")
    }
  }, [airports, departureCity, setValue])

  useEffect(() => {
    if (airports && arrivalCity) {
      const arrivalAirport = airports.find(
        (airport) => airport.city_id === arrivalCity
      )
      setValue("arrival_airport", arrivalAirport?.id || "")
    }
  }, [airports, arrivalCity, setValue])


}

export default useFormDefaults
