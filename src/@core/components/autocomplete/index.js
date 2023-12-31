// ** React Imports
import ReactDOM from "react-dom"
import { useNavigate } from "react-router-dom"
import { Fragment, useEffect, useState, useRef, forwardRef } from "react"

// ** Third Party Components
import PropTypes from "prop-types"
import classnames from "classnames"
import { AlertCircle } from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"

// ** Hooks Imports
import { useOnClickOutside } from "@hooks/useOnClickOutside"

// ** Styles Imports
import "@styles/base/bootstrap-extended/_include.scss"
import "./autocomplete.scss"

const Autocomplete = forwardRef((props, ref) => {
  const { field, errorMessage } = props
  // ** Refs
  const container = useRef(null)
  const inputElRef = useRef(null)//useRef(props.id ?? null)
  const suggestionsListRef = useRef(null)

  // const {showLoading} = props
  // ** States
  const [focused, setFocused] = useState(false)
  const [activeSuggestion, setActiveSuggestion] = useState(0)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [userInput, setUserInput] = useState(props.value ? props.value : "")
  const [validSelection, setValidSelection] = useState(false)

  // ** Vars
  const navigate = useNavigate()
  let filteredData = []

  // ** Suggestion Item Click Event
  const onSuggestionItemClick = (url, e) => {
    const selectedItem = filteredData[activeSuggestion]
    setActiveSuggestion(0)
    setShowSuggestions(false)
    setUserInput(selectedItem[props.filterKey])
    setValidSelection(!!selectedItem[props.filterKey])
    //console.log("onSuggestionItemClick ", val, selectedItem[props.filterKey])
    // Add this line to call onSelectSuggestion prop
    if (props.onSelectSuggestion) {
      props.onSelectSuggestion(selectedItem)
    }

    if (url !== undefined && url !== null) {
      navigate(url)
    }

    if (props.onSuggestionClick) {
      props.onSuggestionClick(url, e)
    }
  }

  // ** Suggestion Hover Event
  const onSuggestionItemHover = (index) => {
    setActiveSuggestion(index)
  }

  // ** Input On Change Event
  const onChange = (e) => {
    const userInput = e.currentTarget.value
    setActiveSuggestion(0)
    setShowSuggestions(true)
    setUserInput(userInput)
    if (e.target.value?.trim() < 1) {
      setShowSuggestions(false)
    }
    const selectedItem = filteredData.find((item) => item.nicename?.toLowerCase() === userInput.toLowerCase())
    if (selectedItem) {
      setValidSelection(true)
    } else {
      setValidSelection(false)
    }
  }

  // ** Input Click Event
  const onInputClick = (e) => {
    e.stopPropagation()
  }

  // ** Function To Render Grouped Suggestions
  const renderGroupedSuggestion = (arr) => {
    const { filterKey, customRender } = props

    const renderSuggestion = (item, i) => {
      if (!customRender) {
        const suggestionURL =
        item.link !== undefined && item.link !== null ? item.link : null
        return (
          <li
            className={classnames("suggestion-item", {
              active: filteredData.indexOf(item) === activeSuggestion
            })}
            key={item[filterKey]}
            onClick={(e) => onSuggestionItemClick(suggestionURL, e)}
            onMouseEnter={() => {
              onSuggestionItemHover(filteredData.indexOf(item))
            }}
          >
            {item[filterKey]}
          </li>)
      } else if (customRender) {
        return customRender(
          item,
          i,
          filteredData,
          activeSuggestion,
          onSuggestionItemClick,
          onSuggestionItemHover,
          userInput
        )
      } else {
        return null
      }
    }

    return arr.map((item, i) => {
      return renderSuggestion(item, i)
    })
  }

  // ** Function To Render Ungrouped Suggestions
  const renderUngroupedSuggestions = () => {
    const { filterKey, suggestions, customRender, suggestionLimit } = props

    filteredData = []
    const sortSingleData = suggestions
      .filter((i) => {
        if (i[filterKey]) {
          const startCondition = i[filterKey]
            .toLowerCase()
            .startsWith(userInput.toLowerCase()),
            includeCondition = i[filterKey]
              .toLowerCase()
              .includes(userInput.toLowerCase())
          if (startCondition) {
            return startCondition
          } else if (!startCondition && includeCondition) {
            return includeCondition
          } else {
            return null
          }
        }
        return false
      })
      .slice(0, suggestionLimit)
    filteredData.push(...sortSingleData)

    if (props.loading && userInput) {
      return (
        <li className="suggestion-item loading-text">Loading...</li>
      )
    }

    if (errorMessage) {
      return (
        <li className="suggestion-item error-message">
          <AlertCircle size={15} />{" "}
          <span className="align-middle ms-50">{errorMessage}</span>
        </li>
      )
    }
    if (sortSingleData.length) {
      return sortSingleData.map((suggestion, index) => {
        const suggestionURL =
          suggestion.link !== undefined && suggestion.link !== null ? suggestion.link : null
        if (!customRender) {
          return (
            <li
              className={classnames("suggestion-item", {
                active: filteredData.indexOf(suggestion) === activeSuggestion
              })}
              key={suggestion[filterKey]}
              onClick={(e) => onSuggestionItemClick(suggestionURL, e)}
              onMouseEnter={() => onSuggestionItemHover(filteredData.indexOf(suggestion))
              }
            >
              {suggestion[filterKey]}
            </li>
          )
        } else if (customRender) {
          return customRender(
            suggestion,
            index,
            filteredData,
            activeSuggestion,
            onSuggestionItemClick,
            onSuggestionItemHover,
            userInput
          )
        } else {
          return null
        }
      })
    } else {
      return (
        <li className="suggestion-item no-result">
          <AlertCircle size={15} />{" "}
          <span className="align-middle ms-50">No Result</span>
        </li>
      )
    }
  }


  // ** Function To Render Suggestions
  const renderSuggestions = () => {
    const { filterKey, grouped, filterHeaderKey, suggestions } = props

    // ** Checks if suggestions are grouped or not.
    if (grouped === undefined || grouped === null || !grouped) {
      return renderUngroupedSuggestions()
    } else {
      filteredData = []
      return suggestions.map((suggestion) => {
        const sortData = suggestion.data
          .filter((i) => {
            const startCondition = i[filterKey]
              .toLowerCase()
              .startsWith(userInput.toLowerCase()),
              includeCondition = i[filterKey]
                .toLowerCase()
                .includes(userInput.toLowerCase())
            if (startCondition) {
              return startCondition
            } else if (!startCondition && includeCondition) {
              return includeCondition
            } else {
              return null
            }
          })
          .slice(0, suggestion.searchLimit)

        filteredData.push(...sortData)
        return (
          <Fragment key={suggestion[filterHeaderKey]}>
            <li className="suggestion-item suggestion-title-wrapper">
              <h6 className="suggestion-title">
                {suggestion[filterHeaderKey]}
              </h6>
            </li>
            {sortData.length ? (
              renderGroupedSuggestion(sortData)
            ) : (
              <li className="suggestion-item no-result">
                <AlertCircle size={15} />{" "}
                <span className="align-middle ms-50">No Result</span>
              </li>
            )}
          </Fragment>
        )
      })
    }
  }

  //** ComponentDidMount
  useEffect(() => {
    if (props.defaultSuggestions && focused) {
      setShowSuggestions(true)
    }
  }, [focused, props.defaultSuggestions])

  //** ComponentDidUpdate
  useEffect(() => {
    const textInput = ReactDOM.findDOMNode(inputElRef.current)

    // ** For searchbar focus
    if (textInput !== null && props.autoFocus) {
      inputElRef.current.focus()
    }
   
    if (props.value !== userInput && props.value === '' && validSelection) {
      setUserInput(props.value)
    }

    // ** If user has passed default suggestions & focus then show default suggestions
    if (props.defaultSuggestions && focused) {
      setShowSuggestions(true)
    }

    // ** Function to run on user passed Clear Input
    if (props.clearInput) {
      props.clearInput(userInput, setUserInput)
    }

    // ** Function on Suggestions Shown
    if (props.onSuggestionsShown && showSuggestions) {
      props.onSuggestionsShown(userInput)
    }
  }, [setShowSuggestions, focused, userInput, showSuggestions, props, validSelection])

  // ** On External Click Close The Search & Call Passed Function
  useOnClickOutside(container, () => {
    setShowSuggestions(false)
    if (props.externalClick) {
      props.externalClick()
    }
  })

  let suggestionsListComponent

  if (showSuggestions) {
    suggestionsListComponent = (
      <PerfectScrollbar
        className={classnames("suggestions-list", {
          [props.wrapperClass]: props.wrapperClass
        })}
        ref={suggestionsListRef}
        component="ul"
        options={{ wheelPropagation: false }}
      >
        {renderSuggestions()}
      </PerfectScrollbar>
    )
  }

  return (
    <div className="autocomplete-container" ref={container}>
      <input
        type="text"
        onChange={(e) => {
          onChange(e)
          if (props.onChange) {
            props.onChange(e)
          }
          if (field) {
            field.onChange(e)
          }
        }}
        value={field?.value !== undefined ? field.value : userInput}
        className={`autocomplete-search ${props.className ? props.className : ""}`}
        placeholder={props.placeholder}
        onClick={onInputClick}
        ref={inputElRef}
        id={props.id}
        name={props.id}
        onFocus={() => setFocused(true)}
        autoComplete={props.autocomplete || 'on'}
        disabled={props.disabled}
        list={`autocomplete${props.autocomplete || 'on'}`}
        aria-autocomplete={props.autocomplete === 'off' ? 'none' : 'inline'}
        autoFocus={props.autoFocus ?? "on"}
        onBlur={(e) => {
          if (props.onBlur) props.onBlur(e)
          setFocused(false)
        }}
      />
      {suggestionsListComponent}
    </div>
  )
})

export default Autocomplete

// ** PropTypes
Autocomplete.propTypes = {
  grouped: PropTypes.bool,
  autoFocus: PropTypes.bool,
  onKeyDown: PropTypes.func,
  onChange: PropTypes.func,
  clearInput: PropTypes.func,
  placeholder: PropTypes.string,
  externalClick: PropTypes.func,
  defaultValue: PropTypes.string,
  wrapperClass: PropTypes.string,
  filterHeaderKey: PropTypes.string,
  suggestionLimit: PropTypes.number,
  onSuggestionsShown: PropTypes.func,
  onSuggestionItemClick: PropTypes.func,
  filterKey: PropTypes.string.isRequired,
  suggestions: PropTypes.array.isRequired,
  autocomplete: PropTypes.string,
  id: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  value: PropTypes.any
}
