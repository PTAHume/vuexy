import { useDispatch } from "react-redux";
import { setWeight } from "../store";
import { useValidation } from "./useValidation";

export const useApplyFilters = (
  handleApplyFilters,
  setIsSubmitting,
  getSuggestionsByFilterKey,
  setError
) => {
  const dispatch = useDispatch();
  const { validateInput } = useValidation();

  const applyFilters = async (
    data,
    departure_country_id,
    departureCityInput,
    departure_city_id,
    departureAirportInput,
    departure_airport_id,
    arrivalCityInput,
    arrival_city_id,
    arrivalCountryInput,
    arrival_country_id,
    arrivalAirportInput,
    arrival_airport_id,
    departureCountryInput
  ) => {
    setIsSubmitting(true);

    // Validate the user's input for the departure country and city
    const isDepartureCountryValid = validateInput(
      departure_country_id,
      departureCountryInput,
      "departureCountry",
      "departure_country",
      "Please select a valid country from the list.",
      "nicename",
      getSuggestionsByFilterKey,
      setError
    );

    const isDepartureCityValid = validateInput(
      departure_city_id,
      departureCityInput,
      "departureCity",
      "departure_city",
      "Please select a valid city from the list.",
      "name",
      getSuggestionsByFilterKey,
      setError
    );

    const isDepartureAirportValid = validateInput(
      departure_airport_id,
      departureAirportInput,
      "departureAirport",
      "departure_airport",
      "Please select a valid airport from the list.",
      "airport_name",
      getSuggestionsByFilterKey,
      setError
    );

    const isArrivalCityValid = validateInput(
      arrival_city_id,
      arrivalCityInput,
      "arrivalCity",
      "arrival_city",
      "Please select a valid city from the list.",
      "name",
      getSuggestionsByFilterKey,
      setError
    );

    const isArrivalCountryValid = validateInput(
      arrival_country_id,
      arrivalCountryInput,
      "arrivalCountry",
      "arrival_country",
      "Please select a valid country from the list.",
      "nicename",
      getSuggestionsByFilterKey,
      setError
    );

    const isArrivalAirportValid = validateInput(
      arrival_airport_id,
      arrivalAirportInput,
      "arrivalAirports",
      "arrival_airport",
      "Please select a valid airport from the list.",
      "airport_name",
      getSuggestionsByFilterKey,
      setError
    );

    if (
      isDepartureCountryValid &&
      isDepartureCityValid &&
      isDepartureAirportValid &&
      isArrivalCountryValid &&
      isArrivalCityValid &&
      isArrivalAirportValid
    ) {
      dispatch(setWeight(data.weight));
      await handleApplyFilters(data);
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1000); // Set the delay to 1 second
    } else {
      setIsSubmitting(false);
    }
  };

  return { applyFilters };
};
