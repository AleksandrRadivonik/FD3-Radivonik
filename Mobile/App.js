"use strict";

import React from "react";
import ReactDOM from "react-dom";

import MobileCompany from "./components/MobileCompany";

import data from "./data.json";

// Отображение компонента
ReactDOM.render(
    <MobileCompany {...data} />,
    document.getElementById("container")
);
