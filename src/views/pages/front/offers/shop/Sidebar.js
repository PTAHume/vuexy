import { useRTL } from "@hooks/useRTL";
import wNumb from "wnumb";
import classnames from "classnames";
import sanctumService from "../../../../../@core/auth/sanctum/sanctumService";
import AutoComplete from "@components/autocomplete";
import {
  Card,
  CardBody,
  Row,
  Col,
  Input,
  Button,
  Label,
  Form,
} from "reactstrap";
import {
  setDepartureCountry,
  setArrivalCountry,
  setDepartureCity,
  setArrivalCity,
  setDepartureAirport,
  setArrivalAirport,
  setDepartureCountryId,
  setDepartureAirportId,
  setDepartureCityId,
  setArrivalCountryId,
  setArrivalCityId,
  setArrivalAirportId,
} from "../store";
import "@styles/react/libs/noui-slider/noui-slider.scss";
import { selectThemeColors } from "@utils";
import { useForm, Controller } from "react-hook-form";
import Flatpickr from "react-flatpickr";
import { useState, useEffect, useCallback, useRef } from "react";
import { getFrontSidebarData } from "../data/data";
import "flatpickr/dist/themes/dark.css";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import { debounce } from "lodash";
import Select, { components } from "react-select";
import { useDispatch, useSelector } from "react-redux";
import useClearIndicator from "../hooks/useClearIndicator";
import useGetSuggestionsByFilterKey from "../hooks/useGetSuggestionsbyFilterKey";
import useDebouncedFetchCountries from "../hooks/debouncedFetchCountries";
import { useValidation } from "../hooks/useValidation";
import { useApplyFilters } from "../hooks/useApplyFilters";
import useResetFields from "../hooks/useResetFields";

{
  /*Lets create related constants here */
}
const Sidebar = ({ sidebarOpen, handleApplyFilters }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const ClearIndicator = useClearIndicator;
  const { filterKey, setFilterKey, getSuggestionsByFilterKey } =
    useGetSuggestionsByFilterKey(suggestions);
  const [isSubmitting, setIsSubmitting] = useState(false);

  {
    /*Ok lets get the redux variables for country,city and airorts */
  }
  const departure_country_id = useSelector(
    (state) => state.ecommerce?.departure_country_id
  );
  const departure_city_id = useSelector(
    (state) => state.ecommerce?.departure_city_id
  );
  const arrival_country_id = useSelector(
    (state) => state.ecommerce?.arrival_country_id
  );
  const arrival_city_id = useSelector(
    (state) => state.ecommerce?.arrival_city_id
  );
  const departure_airport_id = useSelector(
    (state) => state.ecommerce?.departure_airport_id
  );
  const arrival_airport_id = useSelector(
    (state) => state.ecommerce?.departure_airport_id
  );

  {
    /*Lets call the related debounce function as a hook  */
  }
  const { debouncedFetchCountries } = useDebouncedFetchCountries(
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
  );

  //lets add some rules for fields
  const [departureCountryInput, setDepartureCountryInput] = useState("");
  const [departureCityInput, setDepartureCityInput] = useState("");
  const [departureAirportInput, setDepartureAirportInput] = useState("");
  const [arrivalCountryInput, setArrivalCountryInput] = useState("");
  const [arrivalCityInput, setArrivalCityInput] = useState("");
  const [arrivalAirportInput, setArrivalAirportInput] = useState("");

  useEffect(() => {
    if (searchQuery === "") {
      setSuggestions([]);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      debouncedFetchCountries(searchQuery, filterKey);
    }
  }, [searchQuery, filterKey, debouncedFetchCountries]);

  {
    /*Delivery type value and label */
  }
  const delivery_type = [
    { value: "hand_luggage", label: "Hand Luggage" },
    { value: "baggage", label: "Baggage" },
    { value: "document", label: "Document" },
  ];

  const {
    reset,
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { applyFilters } = useApplyFilters(
    handleApplyFilters,
    setIsSubmitting,
    getSuggestionsByFilterKey,
    setError
  );

  const {
    departureCountryKey,
    departureCityKey,
    departureAirportKey,
    arrivalCountryKey,
    arrivalCityKey,
    arrivalAirportKey,

    handleReset,
  } = useResetFields(
    reset,
    setError,
    setValue,
    setDepartureCountryInput,
    setDepartureCityInput,
    setDepartureAirportInput,
    setArrivalCountryInput,
    setArrivalCityInput,
    setArrivalAirportInput
  );

  const [departurePicker, setDeparturePicker] = useState(null);
  const [arrivalPicker, setArrivalPicker] = useState(null);

  return (
    <div className="sidebar-detached sidebar-left">
      <div className="sidebar">
        <div
          className={classnames("sidebar-shop", {
            show: sidebarOpen,
          })}
        >
          <Row>
            <Col sm="12">
              <h6 className="filter-heading d-none d-lg-block">Filters</h6>
            </Col>
          </Row>
          <Card>
            <CardBody>
              <Form
                onSubmit={handleSubmit((data) =>
                  applyFilters(
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
                  )
                )}
              >
                {/* Country */}
                <Label for="departure_country">Departure Country</Label>
                <Controller
                  control={control}
                  name="departure_country"
                  // defaultValue={reduxStore?.departureCountry}
                  defaultValue=""
                  render={({ field }) => (
                    <AutoComplete
                      {...field}
                      key={departureCountryKey} // Add this line
                      loading={isLoading} // Change this line
                      suggestions={getSuggestionsByFilterKey(
                        "departureCountry"
                      )}
                      className="form-control"
                      errorMessage={errorMessage}
                      filterKey="nicename"
                      suggestionLimit={5}
                      placeholder="Type a country name..."
                      onSelectSuggestion={(suggestion) => {
                        field.onChange(suggestion.id);
                        dispatch(setDepartureCountryId(suggestion.id)); // Update the Redux store with the selected country ID
                        dispatch(setDepartureCountry(suggestion.nicename));
                      }}
                      onChange={(event) => {
                        setSearchQuery(event.target.value);
                        setDepartureCountryInput(event.target.value);

                        if (event.target.value === "") {
                          field.onChange(""); // Update the field value if the input is empty
                          dispatch(setDepartureCountryId(null));
                        
                        } else {
                          // Check if the typed value matches any of the available suggestions
                          const matchedSuggestion = getSuggestionsByFilterKey(
                            "departureCountry"
                          ).find(
                            (suggestion) =>
                              suggestion.nicename.toLowerCase() ===
                              event.target.value.toLowerCase()
                          );

                          if (matchedSuggestion) {
                            field.onChange(matchedSuggestion.id);
                            dispatch(
                              setDepartureCountryId(matchedSuggestion.id)
                            );
                          } else {
                            // Clear the previously selected value if the typed value doesn't match any suggestions
                            field.onChange("");
                            dispatch(setDepartureCountryId(null));
                          }
                        }
                        setFilterKey("departureCountry");
                        setErrorMessage(""); // Clear the error message
                      }}
                    />
                  )}
                />
                {errors.departure_country && (
                  <div className="text-danger">
                    {errors.departure_country.message}
                  </div>
                )}
                <br />

                {/* City */}
                <Label for="departure_city">Departure City</Label>
                <Controller
                  control={control}
                  name="departure_city"
                  // defaultValue={reduxStore?.departureCity}
                  defaultValue=""
                  render={({ field }) => (
                    <AutoComplete
                      key={departureCityKey} // Add this line
                      {...field}
                      loading={isLoading}
                      suggestions={getSuggestionsByFilterKey("departureCity")}
                      className="form-control"
                      filterKey="name"
                      suggestionLimit={5}
                      autocomplete="off"
                      id="departure_city"
                      placeholder="Type a city name..."
                      onSelectSuggestion={(suggestion) => {
                        field.onChange(suggestion.id);
                        dispatch(setDepartureCityId(suggestion.id)); // Update the Redux store with the selected city ID
                        dispatch(setDepartureCity(suggestion.name));
                      }}
                      onChange={(event) => {
                        setDepartureCityInput(event.target.value);
                        setSearchQuery(event.target.value);
                        if (event.target.value === "") {
                          field.onChange(""); // Update the field value if the input is empty
                          dispatch(setDepartureCityId(null));
                        } else {
                          // Check if the typed value matches any of the available suggestions
                          const matchedSuggestion = getSuggestionsByFilterKey(
                            "departureCity"
                          ).find(
                            (suggestion) =>
                              suggestion.name.toLowerCase() ===
                              event.target.value.toLowerCase()
                          );

                          if (matchedSuggestion) {
                            field.onChange(matchedSuggestion.id);
                            dispatch(setDepartureCityId(matchedSuggestion.id));
                          } else {
                            // Clear the previously selected value if the typed value doesn't match any suggestions
                            field.onChange("");
                            dispatch(setDepartureCityId(null));
                          }
                        }

                        setFilterKey("departureCity");
                        setErrorMessage(""); // Clear the error message
                      }}
                    // Add this lin
                    />
                  )}
                />
                {errors.departure_city && (
                  <div className="text-danger">
                    {errors.departure_city.message}
                  </div>
                )}

                <br />

                {/* departure airport */}
                <Label for="departure_airport">Departure Airport</Label>
                <Controller
                  control={control}
                  name="departure_airport"
                  // defaultValue={reduxStore?.departureAirport}
                  defaultValue=""
                  render={({ field }) => (
                    <AutoComplete
                      key={departureAirportKey} // Add this line
                      {...field}
                      loading={isLoading}
                      suggestions={getSuggestionsByFilterKey(
                        "departureAirports"
                      )}
                      className="form-control"
                      filterKey="airport_name"
                      suggestionLimit={5} a
                      utocomplete="off"
                      id="departure_airport"
                      placeholder="Type a airport name..."
                      onSelectSuggestion={(suggestion) => {
                        field.onChange(suggestion.id);
                        dispatch(setDepartureAirportId(suggestion.id)); // Update the Redux store with the selected airport ID
                        dispatch(setDepartureAirport(suggestion.airport_name));
                      }}
                      onChange={(event) => {
                        setDepartureAirportInput(event.target.value);
                        setSearchQuery(event.target.value);
                        if (event.target.value === "") {
                          field.onChange(""); // Update the field value if the input is empty
                          dispatch(setDepartureAirportId(null));
                        } else {
                          // Check if the typed value matches any of the available suggestions
                          const matchedSuggestion = getSuggestionsByFilterKey(
                            "departureAirports"
                          ).find(
                            (suggestion) =>
                              suggestion.airport_name.toLowerCase() ===
                              event.target.value.toLowerCase()
                          );

                          if (matchedSuggestion) {
                            field.onChange(matchedSuggestion.id);
                            dispatch(
                              setDepartureAirportId(matchedSuggestion.id)
                            );
                          } else {
                            // Clear the previously selected value if the typed value doesn't match any suggestions
                            field.onChange("");
                            dispatch(setDepartureAirportId(null));
                          }
                        }

                        setFilterKey("departureAirports");
                        setErrorMessage(""); // Clear the error message
                      }}
                    />
                  )}
                />
                {errors.departure_airport && (
                  <div className="text-danger">
                    {errors.departure_airport.message}
                  </div>
                )}
                <br />

                {/*arrival Country */}
                <Label for="arrival_country">Arrival Country</Label>
                <Controller
                  control={control}
                  name="arrival_country"
                  // defaultValue={reduxStore?.arrivalCountry}
                  defaultValue=""
                  render={({ field }) => (
                    <AutoComplete
                      key={arrivalCountryKey} // Add this line
                      {...field}
                      loading={isLoading} // Change this line
                      suggestions={getSuggestionsByFilterKey("arrivalCountry")}
                      className="form-control"
                      errorMessage={errorMessage}
                      filterKey="nicename"
                      suggestionLimit={5}
                      autocomplete="off"
                      id="arrival_country"
                      placeholder="Type a country name..."
                      onSelectSuggestion={(suggestion) => {
                        field.onChange(suggestion.id);
                        dispatch(setArrivalCountryId(suggestion.id)); // Update the Redux store with the selected country ID
                        dispatch(setArrivalCountry(suggestion.nicename));
                      }}
                      onChange={(event) => {
                        setArrivalCountryInput(event.target.value);
                        setSearchQuery(event.target.value);
                        if (event.target.value === "") {
                          field.onChange(""); // Update the field value if the input is empty
                          dispatch(setArrivalCountryId(null));
                        } else {
                          // Check if the typed value matches any of the available suggestions
                          const matchedSuggestion = getSuggestionsByFilterKey(
                            "arrivalCountry"
                          ).find(
                            (suggestion) =>
                              suggestion.nicename.toLowerCase() ===
                              event.target.value.toLowerCase()
                          );

                          if (matchedSuggestion) {
                            field.onChange(matchedSuggestion.id);
                            dispatch(setArrivalCountryId(matchedSuggestion.id));
                          } else {
                            // Clear the previously selected value if the typed value doesn't match any suggestions
                            field.onChange("");
                            dispatch(setArrivalCountryId(null));
                          }
                        }

                        setFilterKey("arrivalCountry");
                        setErrorMessage(""); // Clear the error message
                      }}
                    />
                  )}
                />
                <br />
                {errors.arrival_country && (
                  <div className="text-danger">
                    {errors.arrival_country.message}
                  </div>
                )}
                {/* City */}
                <Label for="arrival_city">Arrival City</Label>
                <Controller
                  control={control}
                  name="arrival_city"
                  // defaultValue={reduxStore?.arrivalCity}
                  defaultValue=""
                  render={({ field }) => (
                    <AutoComplete
                      key={arrivalCityKey} // Add this line
                      {...field}
                      loading={isLoading}
                      suggestions={getSuggestionsByFilterKey("arrivalCity")}
                      className="form-control"
                      filterKey="name"
                      suggestionLimit={5}
                      autocomplete="off"
                      id="arrival_city"
                      placeholder="Type a city name..."
                      onSelectSuggestion={(suggestion) => {
                        field.onChange(suggestion.id);
                        dispatch(setArrivalCityId(suggestion.id));
                        dispatch(setArrivalCity(suggestion.name));
                      }}
                      onChange={(event) => {
                        setArrivalCityInput(event.target.value);
                        setSearchQuery(event.target.value);
                        if (event.target.value === "") {
                          field.onChange(""); // Update the field value if the input is empty
                          dispatch(setArrivalCityId(null));
                        } else {
                          // Check if the typed value matches any of the available suggestions
                          const matchedSuggestion = getSuggestionsByFilterKey(
                            "arrivalCity"
                          ).find(
                            (suggestion) =>
                              suggestion.name.toLowerCase() ===
                              event.target.value.toLowerCase()
                          );

                          if (matchedSuggestion) {
                            field.onChange(matchedSuggestion.id);
                            dispatch(setArrivalCityId(matchedSuggestion.id));
                          } else {
                            // Clear the previously selected value if the typed value doesn't match any suggestions
                            field.onChange("");
                            dispatch(setArrivalCityId(null));
                          }
                        }

                        setFilterKey("arrivalCity");
                        setErrorMessage(""); // Clear the error message
                      }}
                    />
                  )}
                />
                {errors.arrival_city && (
                  <div className="text-danger">
                    {errors.arrival_city.message}
                  </div>
                )}
                <br />

                {/* Arrival airport */}
                <Label for="arrival_airport">Arrival Airport</Label>
                <Controller
                  control={control}
                  name="arrival_airport"
                  // defaultValue={reduxStore?.arrivalAirport}
                  defaultValue=""
                  render={({ field }) => (
                    <AutoComplete
                      key={arrivalAirportKey} // Add this line
                      {...field}
                      loading={isLoading}
                      suggestions={getSuggestionsByFilterKey("arrivalAirports")}
                      className="form-control"
                      filterKey="airport_name"
                      suggestionLimit={5}
                      autocomplete="off"
                      id="arrival_airport"
                      placeholder="Type a airport name..."
                      onSelectSuggestion={(suggestion) => {
                        field.onChange(suggestion.id);
                        dispatch(setArrivalAirportId(suggestion.id)); // Update the Redux store with the selected airport ID
                        dispatch(setArrivalAirport(suggestion.airport_name));
                        setArrivalAirportInput(suggestion.airport_name); // Add this line
                      }}
                      onChange={(event) => {
                        setArrivalAirportInput(event.target.value);
                        setSearchQuery(event.target.value);
                        const matchedSuggestion = getSuggestionsByFilterKey(
                          "arrivalAirports"
                        ).find(
                          (suggestion) =>
                            suggestion.airport_name.toLowerCase() ===
                            event.target.value.toLowerCase()
                        );

                        if (matchedSuggestion) {
                          field.onChange(matchedSuggestion.id);
                          dispatch(setArrivalAirportId(matchedSuggestion.id));
                        } else {
                          field.onChange("");
                          dispatch(setArrivalAirportId(null));
                        }

                        setFilterKey("arrivalAirports");
                        setErrorMessage(""); // Clear the error message
                      }}
                    />
                  )}
                />
                {errors.arrival_airport && (
                  <div className="text-danger">
                    {errors.arrival_airport.message}
                  </div>
                )}
                <br />

                {/* Weight */}
                <Label for="weight">Weight</Label>
                <Controller
                  control={control}
                  id="weightAsync"
                  name="weight"
                  render={({ field }) => (
                    <Input
                      {...field}
                      // value={field.value || reduxStore?.weight || ''}
                      value={field.value || ""}
                      type="number"
                      placeholder="Weight"
                      step="0.01"
                      min="0"
                    />
                  )}
                  autocomplete="off" // Add this lin
                />

                <br />

                {/* Delivery Type */}
                <Label for="delivery_type">Delivery Type</Label>
                <Controller
                  name="delivery_type"
                  id="delivery_typeAsync"
                  control={control}
                  // defaultValue=""
                  render={({ field }) => {
                    // Find the selected option object based on the field value
                    const selectedOption = delivery_type.find(
                      (option) => option.value === field.value
                    );
                    return (
                      <Select
                        options={delivery_type}
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        {...field}
                        value={field.value ? selectedOption : null}
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption?.value);
                        }}
                        isClearable // Add this line
                        components={{ ClearIndicator }} // Add this line
                        onClearValue={() => {
                          field.onChange(""); // Clear the selected value
                        }}
                      />
                    );
                  }}
                  autocomplete="off" // Add this lin
                />
                <br />

                {/* Departure Date */}
                <Label className="form-label" for="departure_date">
                  Departure Date
                </Label>
                <div className="date-input-group">
                  <Controller
                    control={control}
                    id="departure_dateAsync"
                    name="departure_date"
                    render={({ field }) => {
                      return (
                        <div>
                          <Flatpickr
                            {...field}
                            value={field.value || ""}
                            data-enable-time
                            id="departure-picker"
                            options={{
                              dateFormat: "Y-m-d H:i",
                              enableTime: true,
                            }}
                            className={`form-control ${
                              errors.departure_date ? "is-invalid" : ""
                            }`}
                            onChange={(dateObj, dateString) => {
                              setDeparturePicker(dateString);
                              field.onChange(dateString);
                            }}
                          />
                        </div>
                      );
                    }}
                    autocomplete="off" // Add this lin
                  />
                  {departurePicker && (
                    <button
                      className="date-clear-button"
                      onClick={() => {
                        setDeparturePicker("");
                        setValue("departure_date", "");
                      }}
                    >
                      X
                    </button>
                  )}
                </div>
                <br />

                {/* Arrival Date */}
                <Label className="form-label" for="arrival_date">
                  Arrival Date
                </Label>
                <div className="date-input-group">
                  <Controller
                    control={control}
                    id="arrival_dateAsync"
                    name="arrival_date"
                    render={({ field }) => {
                      return (
                        <div>
                          <Flatpickr
                            {...field}
                            value={field.value || ""}
                            data-enable-time
                            id="arrival-picker"
                            options={{
                              dateFormat: "Y-m-d H:i",
                              enableTime: true,
                            }}
                            className={`form-control ${
                              errors.arrival_date ? "is-invalid" : ""
                            }`}
                            onChange={(dateObj, dateString) => {
                              setArrivalPicker(dateString);
                              field.onChange(dateString);
                            }}
                          />
                        </div>
                      );
                    }}
                    autocomplete="off" // Add this
                  />
                  {arrivalPicker && (
                    <button
                      className="date-clear-button"
                      onClick={() => {
                        setArrivalPicker("");
                        setValue("arrival_date", "");
                      }}
                    >
                      X
                    </button>
                  )}
                </div>

                {/* Price */}
                <div className="price-slider">
                  <h6 className="filter-title">Price Range</h6>
                  <div className="d-flex align-items-center">
                    <Controller
                      name="minPrice"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="number"
                          min="1"
                          max="1000"
                          placeholder="Min"
                          className="price-input mr-1"
                        />
                      )}
                      autocomplete="off" // Add this lin
                    />

                    <span className="mx-1">-</span>

                    <Controller
                      name="maxPrice"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="number"
                          min="1"
                          max="1000"
                          placeholder="Max"
                          className="price-input ml-1"
                        />
                      )}
                      autocomplete="off" // Add this lin
                    />
                  </div>
                </div>

                <br />

                <div
                  id="clear-filters"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <div style={{ paddingRight: "20px" }}>
                    <Button type="reset" color="primary" onClick={handleReset}>
                      Clear
                    </Button>
                  </div>
                  <Button type="submit" color="primary" disabled={isSubmitting}>
                    {isSubmitting && (
                      <div id="loading-overlay" style={{ display: "flex" }}>
                        <div className="loader"></div>
                      </div>
                    )}
                    Apply
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
