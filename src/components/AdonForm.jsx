import React, { Component } from "react";
import easyScroll from "easy-scroll";
import TelstraChoice from "./questions/TelstraChoice";
import BusinessName from "./questions/BusinessName";
import EmailAddress from "./questions/EmailAddress";
import MobileNumber from "./questions/MobileNumber";

class AdonForm extends Component {
  state = {
    form: {
      telstraMobile: "",
      businessName: "",
      email: "",
      mobileNumber: "",
      planId: "",
      voice: "",
      categoryId: "",
      popularScripts: [],
      customScripts: [],
      requestedScripts: 0
    },
    order: ["telstraMobile", "businessName", "email", "mobileNumber"],
    plans: [
      { id: 1, name: "Ad On Mobile 4" },
      { id: 2, name: "Ad On Mobile 8" },
      { id: 3, name: "Ad On Mobile 12" },
      { id: 4, name: "Ad On Mobile 16" }
    ],
    errors: {},
    active: "telstraMobile"
  };

  constructor() {
    super();

    for (var key in this.state.form) {
      this[key] = React.createRef();
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log("submitted");
  };

  handleSelect = (name, value) => {
    const form = { ...this.state.form };
    form[name] = value;

    const order = [...this.state.order];
    const index = order.findIndex(o => o === name);

    if (!order[index + 1]) return;
    const active = order[index + 1];

    this.setState({ form, active });

    this.scrollNext(active);
  };

  handleChange = ({ currentTarget: input }) => {
    const form = { ...this.state.form };
    form[input.name] = input.value;
    this.setState({ form });
  };

  handleNext = name => {
    const order = [...this.state.order];
    const index = order.findIndex(o => o === name);

    if (!order[index + 1]) return;
    const active = order[index + 1];

    this.setState({ active });

    this.scrollNext(active);
  };

  scrollNext = active => {
    easyScroll({
      scrollableDomEle: window,
      direction: "bottom",
      duration: 300,
      easingPreset: "easeInQuad",
      scrollAmount: this[active].offsetTop
    });
  };

  render() {
    const { form, errors, active } = this.state;

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <TelstraChoice
            refs={this.telstraMobile}
            name="telstraMobile"
            active={active === "telstraMobile"}
            value={form.telstraMobile}
            error={errors.telstraMobile}
            onSelect={this.handleSelect}
          />

          <BusinessName
            refs={this.businessName}
            name="businessName"
            active={active === "businessName"}
            value={form.businessName}
            error={errors.businessName}
            onChange={this.handleChange}
            onNext={this.handleNext}
          />

          <EmailAddress
            refs={this.email}
            name="email"
            active={active === "email"}
            value={form.email}
            error={errors.email}
            onChange={this.handleChange}
            onNext={this.handleNext}
          />

          <MobileNumber
            refs={this.mobileNumber}
            name="mobileNumber"
            active={active === "mobileNumber"}
            value={form.mobileNumber}
            error={errors.mobileNumber}
            onChange={this.handleChange}
            onNext={this.handleNext}
          />
        </form>
      </div>
    );
  }
}

export default AdonForm;
