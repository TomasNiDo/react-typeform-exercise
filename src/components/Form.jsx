import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./Input";
import Select from "./Select";

class Form extends Component {
  state = {
    form: {},
    errors: {},
    active: ""
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.form, this.schema, options);
    if (!error) return null;

    const errors = {};

    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const field = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(field, schema);

    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
    }

    const form = { ...this.state.form };
    form[input.name] = input.value;

    this.setState({ form, errors });
  };

  handleNext = name => {
    console.log(name);
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text", active = false) {
    const { form, errors } = this.state;

    return (
      <Input
        name={name}
        value={form[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
        type={type}
        active={active}
        disabled={active ? false : true}
        onNext={() => this.handleNext(name)}
      />
    );
  }

  renderSelect(name, label, options) {
    const { form, errors } = this.state;

    return (
      <Select
        name={name}
        value={form[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
        options={options}
      />
    );
  }
}

export default Form;
