import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Label from "../Label";

const MobileNumber = props => {
  const { refs, active, name, error, value, onNext, ...rest } = props;

  return (
    <section ref={refs} className="section">
      <div className={active ? "form-group active" : "form-group"}>
        <Label index="4" label="Mobile Number" name={name} />
        <div className="ml-5">
          <input
            type="text"
            className="form-control"
            name={name}
            value={value}
            {...rest}
          />

          {error && <div className="text-danger mt-3">{error}</div>}
          {value && (
            <div className="mt-3">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => onNext(name)}
              >
                Next <FontAwesomeIcon icon="check" />
              </button>
              <span className="text-primary tracking-wide font-weight-bold text-uppercase">
                Press enter
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MobileNumber;
