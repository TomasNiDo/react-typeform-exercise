import React from "react";

const Label = ({ index, label, name }) => {
  return (
    <label htmlFor={name}>
      <span className="index text-primary">{index}.</span> {label}
    </label>
  );
};

export default Label;
