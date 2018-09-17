import React, { Component } from "react";
import Joi from "joi-browser";
import easyScroll from "easy-scroll";
import _ from "lodash";
import Input from "./components/Input";
import "./App.css";

window.easyScroll = easyScroll;

class App extends Component {
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

  handleNext = (question = null) => {
    const questions = [...this.state.questions];

    if (!question) {
      question = questions.find(q => q.active);
    }

    const hasError = this.checkErrors(question);

    if (hasError) return;

    const index = questions.indexOf(question);

    if (!questions[index + 1]) return;

    questions[index].active = false;
    questions[index + 1].active = true;

    const scroll = this.state.scroll + 180;
    easyScroll({
      scrollableDomEle: window,
      direction: "bottom",
      duration: 300,
      easingPreset: "easeInQuad",
      scrollAmount: scroll
    });

    this.setState({ questions, scroll });
  };

  handlePrevious = (question = null) => {
    const questions = [...this.state.questions];

    if (!question) {
      question = questions.find(q => q.active);
    }

    const index = questions.indexOf(question);

    if (!questions[index - 1]) return;

    questions[index].active = false;
    questions[index - 1].active = true;

    const scroll = this.state.scroll - 180;
    easyScroll({
      scrollableDomEle: window,
      direction: "top",
      duration: 300,
      easingPreset: "easeInQuad",
      scrollAmount: scroll
    });

    this.setState({ questions, scroll });
  };

  handleKeyPress = e => {
    const keyCode = e.which || e.keyCode;
    console.log(keyCode);
    if (keyCode === 9) {
      const canProceed = this.checkIfCanProceed();
      if (!canProceed) return e.preventDefault();
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

    this.handleNext(question);

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
        <div
          className="container d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <form onSubmit={this.handleSubmit} className="col">
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
                onNext={() => this.handleNext(question)}
                onKeyDown={this.handleKeyPress}
              />
            ))}
            <button className="btn btn-primary">Submit</button>
          </form>
        </div>

        <div className="footer">
          <span className="btn-group">
            <button
              className="btn btn-primary"
              onClick={() => this.handlePrevious()}
            >
              Prev
            </button>
            <button
              className="btn btn-primary"
              onClick={() => this.handleNext()}
            >
              Next
            </button>
          </span>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
