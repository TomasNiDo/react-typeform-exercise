import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

library.add(faCheck, faTimes);

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
