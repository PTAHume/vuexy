import React from "react";
import { components } from "react-select";

 {/* We are adding "X" to the right hand of the field */}
const ClearIndicator = (props) => {
    const {
      innerProps: { ref, ...restInnerProps },
    } = props;
  
    return (
      <components.ClearIndicator {...props}>
        <button
          {...restInnerProps}
          ref={ref}
          onClick={() => props.selectProps.onClearValue()}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "gray",
            marginRight: "0px",
            fontSize: "14px",
          }}
        >
          x
        </button>
      </components.ClearIndicator>
    );
  };

  export default ClearIndicator;