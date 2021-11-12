"use strict";

import React from "react";
import ReactDOM from "react-dom";

import Shop from "./components/Shop";

import shopParams from "./shop.json";

// Отображение компонента
ReactDOM.render(
    <Shop {...shopParams} />,
    document.getElementById("container")
);
