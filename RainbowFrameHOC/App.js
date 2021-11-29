"use strict";

import React from "react";
import ReactDOM from "react-dom";

import DoubleButton from "./components/DoubleButton";
import withRainbowFrame from "./components/withRainbowFrame";

import "./App.css";

// Класс для проверки компонента
class RainbowFrameTest extends React.Component {
    render() {
        let colors = ["red", "orange", "yellow", "green", "#00BFFF", "blue", "purple"];
        let FramedDoubleButton = withRainbowFrame(colors)(DoubleButton);
        return (
            <FramedDoubleButton caption1="я из лесу" caption2="мороз" cbPressed={num => alert(num)}>вышел, был сильный</FramedDoubleButton>
        );
    }
}

// Отображение компонента
ReactDOM.render(
    <RainbowFrameTest />,
    document.getElementById("container")
);
