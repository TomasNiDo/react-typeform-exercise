import React, { Component } from "react";
import Joi from "joi-browser";
import easyScroll from "easy-scroll";
import _ from "lodash";
import Input from "./Input";

class TypeForm extends Component {
  state = {
    questions: [
      {
        name: "name",
        label: "What is your name",
        value: "",
        active: true,
        type: "text"
      },
      {
        name: "age",
        label: "What is your age",
        value: 0,
        active: false,
        type: "number"
      },
      {
        name: "street",
        label: "What is your street",
        value: "",
        active: false,
        type: "text"
      },
      {
        name: "zip_code",
        label: "What is your zip code",
        value: "",
        active: false,
        type: "text"
      }
    ],
    errors: {},
    scroll: 0,
    userScroll: 0
  };

  schema = {
    name: Joi.string()
      .required()
      .label("Name"),
    age: Joi.number()
      .required()
      .min(1)
      .max(100)
      .label("Age"),
    street: Joi.string()
      .required()
      .label("Address"),
    zip_code: Joi.number()
      .required()
      .label("Zip code")
  };

  componentDidMount() {
    window.addEventListener("scroll", _.debounce(this.handleScroll, 150));
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = event => {
    const userScroll = window.scrollY;
    console.log(userScroll);
    if (userScroll > this.state.userScroll) {
      console.log("paubos");
      this.setState({ userScroll });
      this.handleScrollNext();
    }

    if (userScroll < this.state.userScroll) {
      console.log("pataas");
      this.setState({ userScroll });
      this.handleScrollPrevious();
    }
  };

  handleScrollNext = () => {
    const questions = [...this.state.questions];
    const question = questions.find(q => q.active);

    const index = questions.indexOf(question);
    if (!questions[index + 1]) return;

    questions[index].active = false;
    questions[index + 1].active = true;

    this.setState({ questions });
  };

  handleScrollPrevious = () => {
    const questions = [...this.state.questions];
    const question = questions.find(q => q.active);

    const index = questions.indexOf(question);
    if (!questions[index - 1]) return;

    questions[index].active = false;
    questions[index - 1].active = true;

    this.setState({ questions });
  };

  validateProperty = ({ name, value }) => {
    const field = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(field, schema);

    return error ? error.details[0].message : null;
  };

  checkErrors = input => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    let hasError = false;

    if (errorMessage) {
      errors[input.name] = errorMessage;
      hasError = true;
    } else {
      delete errors[input.name];
    }

    this.setState({ errors });

    return hasError;
  };

  handleChange = ({ currentTarget: input }) => {
    this.checkErrors(input);

    const questions = [...this.state.questions];
    const index = questions.findIndex(question => question.name === input.name);

    questions[index].value = input.value;
    this.setState({ questions });
  };

  handleNext = () => {
    const scroll = this.state.scroll + 400;

    easyScroll({
      scrollableDomEle: window,
      direction: "bottom",
      duration: 300,
      easingPreset: "easeInQuad",
      scrollAmount: 400
    });

    this.setState({ scroll });
  };

  handlePrevious = () => {
    const scroll = this.state.scroll - 400;

    easyScroll({
      scrollableDomEle: window,
      direction: "bottom",
      duration: 300,
      easingPreset: "easeInQuad",
      scrollAmount: -400
    });

    this.setState({ scroll });
  };

  handleKeyPress = e => {
    const keyCode = e.which || e.keyCode;

    if (keyCode === 9) {
      this.handleNext();
    }

    if (keyCode === 13) {
      e.preventDefault();

      this.checkIfCanProceed();
    }
  };

  checkIfCanProceed = () => {
    const question = this.state.questions.find(q => q.active);
    const hasError = this.checkErrors(question);

    if (hasError) return false;

    this.handleNext();

    return true;
  };

  handleSubmit = e => {
    console.log(e);
    e.preventDefault();
    console.log("submitted");
  };

  render() {
    const { questions, errors } = this.state;

    return (
      <React.Fragment>
        <div className="container d-flex justify-content-center">
          <form onSubmit={this.handleSubmit} className="col-8">
            <div className="form-group active">
              <h3>Subscribe</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
                pariatur, amet molestias reiciendis animi rerum voluptatum
                tempora facere, assumenda eius quo et quis sapiente! Velit quam
                reprehenderit quo laudantium libero.
              </p>
            </div>
            {questions.map((question, index) => (
              <Input
                key={index}
                name={question.name}
                value={question.value}
                label={question.label}
                onChange={this.handleChange}
                error={errors[question.name]}
                type={question.type}
                active={question.active}
                autoFocus={question.active}
                onNext={this.handleNext}
                onKeyDown={this.handleKeyPress}
              />
            ))}
            <div className="form-group active">
              <button className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>

        <div className="footer">
          <span className="btn-group">
            <button className="btn btn-primary" onClick={this.handlePrevious}>
              Prev
            </button>
            <button className="btn btn-primary" onClick={this.handleNext}>
              Next
            </button>
          </span>
        </div>
      </React.Fragment>
    );
  }
}

export default TypeForm;
