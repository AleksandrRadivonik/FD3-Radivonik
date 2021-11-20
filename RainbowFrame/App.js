"use strict";

import React from "react";
import ReactDOM from "react-dom";

import RainbowFrame from "./components/RainbowFrame";

import "./App.css";

// Класс для проверки компонента
class RainbowFrameText extends React.Component {
    render() {
        let colors = ["red", "orange", "yellow", "green", "#00BFFF", "blue", "purple"];
        return (
            <RainbowFrame colors={colors}>
                Hello!
            </RainbowFrame>
        );
    }
}

// Отображение компонента
ReactDOM.render(
    <RainbowFrameText />,
    document.getElementById("container")
);
