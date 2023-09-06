import { useState } from "react"
import Avatar from "@components/avatar"
import { Check } from "react-feather"

const useFormSubmission = (handleSubmit, errors, id, redux, sanctum, dispatch, fetchDealDataSuccess, toast, setError) => {
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data) => {
    // console.log(data)
    setIsLoading(true)
    const isFieldFilled = (field) => {
      const disallowedValues = [
        "Select City",
        "Select Country",
        "Select Airport",
        "",
        " ",
        "Select..."
      ]

      return typeof field === "object" ? field !== null && field !== undefined && Object.keys(field).length > 0 : typeof field !== "object" &&
        field.toString().length > 0 &&
        !disallowedValues.includes(field)
    }

    const allFieldsFilled = Object.values(data).every(isFieldFilled)

    if (allFieldsFilled && (!errors || Object.keys(errors).length === 0)) {
      console.log(data.duty_free.value)
      try {
        const dealData = {

          id,
          arrival_airport_id: data.arrival_airport,
          arrival_city_id: data.arrival_city,
          arrival_country_id: data.arrival_country,
          delivery_type: data.delivery_type.value, // Access the 'value' property
          departure_airport_id: data.departure_airport,
          departure_city_id: data.departure_city,
          departure_country_id: data.departure_country,
          //flight_number: data.flight_number,
          price: data.price,
          //user_id: data.user_id, //
          weight: data.weight,
          status: data.status.value, // Access the 'value' property
          departure_date: data.departure_date,
          arrival_date: data.arrival_date,
          duty_free: data.duty_free.value
          //user_authenticated: data.user_authenticated.value
        }
        const res = await sanctum.updateUserDealDetails(dealData, id)

        if (res.status === 201) {
          setIsLoading(false)
          localStorage.setItem("lastUpdated", Date.now())
          //  console.log(res.data)
          dispatch(fetchDealDataSuccess(res.data))

          toast(
            <div className="d-flex">
              <div className="me-1">
                <Avatar size="sm" color="success" icon={<Check size={12} />} />
              </div>
              <div className="d-flex flex-column">
                <h6>Form Submitted!</h6>
                <div></div>
                <span>You have successfully updated the Deal details!</span>
              </div>
            </div>
          )
        }
      } catch (error) {
        console.log(error)
        setIsLoading(false)
        if (error.response && error.response.status === 422) {
          const errors = error.response.data.errors
          if (errors.user_name) {
            setError("user_name", {
              type: "manual",
              message: errors.user_name ? errors.user_name : "Incorrect username"
            })
          } else if (errors.paflightssword) {
            setError("flight", {
              type: "manual",
              message: errors.flight ? errors.flight : "Incorrect flight"
            })
          } else if (errors.delivery_type) {
            setError("delivery_type", {
              type: "manual",
              message: errors.delivery_type ? errors.delivery_type : "Incorrect delivery type"
            })
          } else if (errors.price) {
            setError("price", {
              type: "manual",
              message: errors.price ? errors.price : "Incorrect price"
            })
          } else if (errors.weight) {
            setError("weight", {
              type: "manual",
              message: errors.weight ? errors.weight : "Incorrect weight"
            })
          } else if (errors.departure_airport) {
            setError("departure_airport", {
              type: "manual",
              message: errors.departure_airport ? errors.departure_airport : "Incorrect departure airport"
            })
          } else if (errors.arrival_airport) {
            setError("arrival_airport", {
              type: "manual",
              message: errors.arrival_airport ? errors.arrival_airport : "Incorrect arrival airport"
            })
          } else if (errors.departure_country) {
            setError("departure_country", {
              type: "manual",
              message: errors.departure_country ? errors.departure_country : "Incorrect country"
            })
          } else if (errors.arrival_country) {
            setError("arrival_country", {
              type: "manual",
              message: errors.arrival_country ? errors.arrival_country : "Incorrect country"
            })
          } else if (errors.departure_city) {
            setError("departure_city", {
              type: "manual",
              message: errors.departure_city ? errors.departure_city : "Incorrect city"
            })
          } else if (errors.arrival_city) {
            setError("arrival_city", {
              type: "manual",
              message: errors.arrival_city ? errors.arrival_city : "Incorrect city"
            })
          } else if (errors.arrival_date) {
            setError("arrival_date", {
              type: "manual",
              message: errors.arrival_date ? errors.arrival_date : "Incorrect date"
            })
          } else if (errors.departure_date) {
            setError("departure_date", {
              type: "manual",
              message: errors.departure_date ? errors.departure_date : "Incorrect date"
            })
          } else if (errors.status) {
            setError("status", {
              type: "manual",
              message: errors.status ? errors.status : "Incorrect correct status"
            })
          }
        } else {
          console.error("Unexpected error:", error)
        }
      }
    } else {
      for (const key in data) {
        if (!isFieldFilled(data[key])) {
          const errorMessage =
            data[key] === "" ||
              (typeof data[key] === "object" &&
                Object.keys(data[key]).length === 0) ? `The ${key} field has no available options.` : `The ${key} field is required.`

          setError(key, {
            type: "manual",
            message: errorMessage
          })
        }
      }
    }
  }

  return { onSubmit, isLoading, setIsLoading }
}

export default useFormSubmission
