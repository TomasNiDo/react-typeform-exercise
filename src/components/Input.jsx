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
        <button
          type="button"
          tabIndex="-1"
          className="btn btn-primary btn-sm mt-2"
          onClick={onNext}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Input;
