// hooks/useDropdownHandlers.js
import { useState, useEffect } from "react";

const useDropdownHandlers = (cities, airports, setValue, defaultDepartureCountry, defaultDepartureCity,defaultArrivalCity, defaultArrivalCountry,defaultUser) => {
  const [filteredDepartureCities, setFilteredDepartureCities] = useState([]);
  const [filteredArrivalCities, setFilteredArrivalCities] = useState([]);
  const [filteredDepartureAirports, setfilteredDepartureAirports] = useState([]);
  const [filteredArrivalAirports, setfilteredArrivalAirports] = useState([]);

  useEffect(() => {
    // Your existing logic to handle departure and arrival country changes
    if (defaultDepartureCountry) {
        handleDepartureCountryChange(defaultDepartureCountry.id);
      }
   
      
      if (defaultArrivalCountry) {
        handleArrivalCountryChange(defaultArrivalCountry.id);
      }
      if (defaultUser) {
        handleUserChange(defaultUser.id);
      }

      if (defaultDepartureCity) {
        handleDepartureCityChange(defaultDepartureCity.id);
      }
      if (defaultArrivalCity) {
        handleArrivalCityChange(defaultArrivalCity.id);
      }

  }, [defaultDepartureCountry, defaultArrivalCountry, defaultDepartureCity, defaultArrivalCity, defaultUser]);

  const handleDepartureCountryChange = (selectedCountryId) => {
    // Your existing logic for handleDepartureCountryChange
    if (selectedCountryId) {
        const filteredDepartureCities = cities.filter(
          (city) => city.country_id === selectedCountryId
        );
       
        setFilteredDepartureCities(filteredDepartureCities);
        if (filteredDepartureCities.length > 0) {
          const firstCityAirports = airports.filter(
            (airport) => airport.city_id === filteredDepartureCities[0].id
          );
          setfilteredDepartureAirports(firstCityAirports);
        } else {
          setfilteredDepartureAirports([]);
        }
      };
  };

  const handleArrivalCountryChange = (selectedCountryId) => {
    // Your existing logic for handleArrivalCountryChange
    if (selectedCountryId) {
        const filteredArrivalCities = cities.filter(
          (city) => city.country_id === selectedCountryId
        );
        setFilteredArrivalCities(filteredArrivalCities);
        if (filteredArrivalCities.length > 0) {
          const firstCityAirports = airports.filter(
            (airport) => airport.city_id === filteredArrivalCities[0].id
          );
          setfilteredArrivalAirports(firstCityAirports);
        } else {
          setfilteredArrivalAirports([]);
        }
      };
  };

  const handleUserChange = (selectedUserId) => {
    if (selectedUserId) {
      setValue("user_id", selectedUserId);
    }
  };



  const handleDepartureCityChange = (selectedCityId) => {
    if (selectedCityId) {
      const filteredDepartureAirports = airports.filter(
        (airport) => airport.city_id === selectedCityId
      );
  
      setfilteredDepartureAirports(filteredDepartureAirports);
  
      if (filteredDepartureAirports.length > 0) {
        // Set the first airport of the newly chosen city as the selected airport
        setValue("departure_airport", filteredDepartureAirports[0].id);
      } else {
        setValue("departure_airport", ""); // Reset the airport value only if there are no airports for the selected city
      }
    } else {
      setfilteredDepartureAirports([]);
    }
  };


  
  const handleArrivalCityChange = (selectedCityId) => {
    if (selectedCityId) {
      const filteredArrivalAirports = airports.filter(
        (airport) => airport.city_id === selectedCityId
      );
  
      setfilteredArrivalAirports(filteredArrivalAirports);
  
      if (filteredArrivalAirports.length > 0) {
        // Set the first airport of the newly chosen city as the selected airport
        setValue("arrival_airport", filteredArrivalAirports[0].id);
      } else {
        setValue("arrival_airport", ""); // Reset the airport value only if there are no airports for the selected city
      }
    } else {
      setfilteredArrivalAirports([]);
    }
  };

  


  return {
    handleDepartureCountryChange,
    handleArrivalCountryChange,
    handleUserChange,
    filteredDepartureCities,
    filteredArrivalCities,
    filteredDepartureAirports, // Add this line
    handleDepartureCityChange, // Add this line
    handleArrivalCityChange,
    filteredArrivalAirports,
  };
};

export default useDropdownHandlers;
