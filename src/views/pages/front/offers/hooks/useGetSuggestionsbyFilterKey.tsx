import { useState } from "react";

const useGetSuggestionsByFilterKey = (suggestions) => {
    const [filterKey, setFilterKey] = useState("countries");
  
    const getSuggestionsByFilterKey = (filterKey) => {
      if (!suggestions || typeof suggestions !== "object") {
        return [];
      }
  
      let result;
  
      switch (filterKey) {
        case "departureCountry":
          result = suggestions.departureCountries;
          break;
        case "departureCity":
          result = suggestions.departureCities;
          break;
        case "arrivalCountry":
          result = suggestions.arrivalCountries;
          break;
        case "arrivalCity":
          result = suggestions.arrivalCities;
          break;
        case "departureAirports":
          result = suggestions.departureAirports;
          break;
        case "arrivalAirports":
          result = suggestions.arrivalAirports;
          break;
        default:
          result = [];
      }
  
      return Array.isArray(result) ? result : [];
    };
  
    return { filterKey, setFilterKey, getSuggestionsByFilterKey };
  };
  
  export default useGetSuggestionsByFilterKey;
  