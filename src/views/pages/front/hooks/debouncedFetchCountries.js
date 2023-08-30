import { useState, useRef, useCallback } from "react";
import { debounce } from "lodash";
import { getFrontSidebarData } from "../offers/data/data";

const useDebouncedFetchCountries = (
    searchQuery,
    filterKey,
    departure_country_id,
    departure_city_id,
    arrival_country_id,
    arrival_city_id,
    departure_airport_id,
    arrival_airport_id,
    setSuggestions,
    setIsLoading,
    setErrorMessage
  ) => {
    const lastRequestTimestamp = useRef(null);
  
    const debouncedFetchCountries = useCallback(
      debounce(async (searchQuery) => {
        const requestTimestamp = Date.now();
        lastRequestTimestamp.current = requestTimestamp;
  
        try {
          const SidebarSearchData = await getFrontSidebarData(
            searchQuery,
            filterKey,
            departure_country_id,
            departure_city_id,
            arrival_country_id,
            arrival_city_id,
            departure_airport_id,
            arrival_airport_id
          );
  
          if (SidebarSearchData.error) {
            if (SidebarSearchData.error.status === 429) {
              setIsLoading(false);
              setErrorMessage("Too many requests, try again in a bit.");
              return;
            }
          }
  
          if (lastRequestTimestamp.current === requestTimestamp) {
            switch (filterKey) {
              case "departureCountry":
                setSuggestions({
                  departureCountries: SidebarSearchData || [],
                });
                break;
              case "departureCity":
                setSuggestions({ departureCities: SidebarSearchData || [] });
                break;
              case "departureAirports":
                setSuggestions({
                  departureAirports: SidebarSearchData || [],
                });
                break;
              case "arrivalCountry":
                setSuggestions({ arrivalCountries: SidebarSearchData || [] });
                break;
              case "arrivalCity":
                setSuggestions({ arrivalCities: SidebarSearchData || [] });
                break;
              case "arrivalAirports":
                setSuggestions({
                  arrivalAirports: SidebarSearchData || [],
                });
            }
            setIsLoading(false);
          }
        } catch (error) {
          console.error("Something went wrong:", error);
        }
      }, 50),
      [
        searchQuery,
        filterKey,
        departure_country_id,
        departure_city_id,
        arrival_country_id,
        arrival_city_id,
        departure_airport_id,
        arrival_airport_id,
        setSuggestions,
        setIsLoading,
        setErrorMessage,
      ]
    );
  
    return { debouncedFetchCountries };
  };
  
  export default useDebouncedFetchCountries;
  