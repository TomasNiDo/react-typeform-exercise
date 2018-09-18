import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Label from "../Label";

const TelstraChoice = ({ refs, active, value, name, error, onSelect }) => {
  return (
    <section ref={refs} className="section">
      <div className={active ? "form-group active" : "form-group"}>
        <Label index="1" label="Telstra Mobile" name={name} />

        <div className="choices d-flex ml-4">
          <button
            type="button"
            className={value === true ? "choice active" : "choice"}
            onClick={() => onSelect(name, true)}
          >
            <span className="choice-icon">
              <FontAwesomeIcon icon="check" />
            </span>
            <span className="choice-text">Yes</span>
          </button>

          <button
            type="button"
            className={value === false ? "choice active" : "choice"}
            onClick={() => onSelect(name, false)}
          >
            <span className="choice-icon">
              <FontAwesomeIcon icon="times" />
            </span>
            <span className="choice-text">No</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TelstraChoice;
