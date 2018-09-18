import React from "react";

const Input = ({ name, label, error, value, active, onNext, ...rest }) => {
  return (
    <div className={active ? "form-group active" : "form-group"}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        {...rest}
        id={name}
        name={name}
        value={value}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
      {value !== "" && (
        <div className="d-flex align-items-center mt-4">
          <button
            type="button"
            tabIndex="-1"
            className="btn btn-primary tracking-wide font-weight-bold text-uppercase"
            onClick={onNext}
          >
            Next
          </button>
          <span className="tracking-wide font-weight-bold text-uppercase text-primary ml-2">or Press Tab</span>
        </div>
      )}
    </div>
  );
};

export default Input;
