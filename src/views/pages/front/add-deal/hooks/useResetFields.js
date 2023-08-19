import { useState } from "react";

const useResetFields = (
  reset,
  setError,
  setValue,
  setDepartureCountryInput,
  setDepartureCityInput,
  setDepartureAirportInput,
  setArrivalCountryInput,
  setArrivalCityInput,
  setArrivalAirportInput
) => {
  const [departureCountryKey, setDepartureCountryKey] = useState(0);
  const [departureCityKey, setDepartureCityKey] = useState(0);
  const [departureAirportKey, setDepartureAirportKey] = useState(0);
  const [arrivalCountryKey, setArrivalCountryKey] = useState(0);
  const [arrivalCityKey, setArrivalCityKey] = useState(0);
  const [arrivalAirportKey, setArrivalAirportKey] = useState(0);

  const handleReset = () => {
    reset();

    // Update the local state
    setDepartureCountryInput("");
    setDepartureCityInput("");
    setDepartureAirportInput("");
    setArrivalCountryInput("");
    setArrivalCityInput("");
    setArrivalAirportInput("");

    setDepartureCountryKey((prevKey) => prevKey + 1);
    setDepartureCityKey((prevKey) => prevKey + 1);
    setDepartureAirportKey((prevKey) => prevKey + 1);
    setArrivalCountryKey((prevKey) => prevKey + 1);
    setArrivalCityKey((prevKey) => prevKey + 1);
    setArrivalAirportKey((prevKey) => prevKey + 1);
  };

  return {
    departureCountryKey,
    departureCityKey,
    departureAirportKey,
    arrivalCountryKey,
    arrivalCityKey,
    arrivalAirportKey,
    handleReset,
  };
};

export default useResetFields;
