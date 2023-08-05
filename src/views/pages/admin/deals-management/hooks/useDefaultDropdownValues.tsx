const useDefaultDropdownValues = (countries, cities, airports, redux, id) => {
  const defaultDepartureCountry = countries.find(
    (country) =>
      country.id === (redux.dealData && redux.dealData[id]?.departure_country_id)
  );

  const defaultArrivalCountry = countries.find(
    (country) =>
      country.id === (redux.dealData && redux.dealData[id]?.arrival_country_id)
  );

  const defaultDepartureCity = cities.find(
    (city) =>
      city.id === (redux.dealData && redux.dealData[id]?.departure_city_id)
  );

  const defaultArrivalCity = cities.find(
    (city) =>
      city.id === (redux.dealData && redux.dealData[id]?.arrival_city_id)
  );

  const defaultDepartureAirport = airports.find(
    (airport) =>
      airport.id === (redux.dealData && redux.dealData[id]?.departure_airport_id)
  );

  const defaultArrivalAirport = airports.find(
    (airport) =>
      airport.id === (redux.dealData && redux.dealData[id]?.arrival_airport_id)
  );

  const defaultUser = redux.dealData[id]?.user?.find(
    (user) => user.id === (redux.dealData && redux.dealData[id]?.user_id.id)
  ) || null;

  return {
    defaultDepartureCountry,
    defaultArrivalCountry,
    defaultDepartureCity,
    defaultArrivalCity,
    defaultDepartureAirport,
    defaultArrivalAirport,
    defaultUser,
  };
};

export default useDefaultDropdownValues;
