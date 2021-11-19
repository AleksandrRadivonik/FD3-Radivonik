"use strict";

import React from "react";
import ReactDOM from "react-dom";

import BR2JSX from "./components/BR2JSX";

// Класс для проверки компонента
class BR2JSXTest extends React.Component {
    render() {
        let text = "первый<br>второй<br/>третий<br />последний";
        return (<BR2JSX text={text}/>);
    }
}

// Отображение компонента
ReactDOM.render(
    <BR2JSXTest />,
    document.getElementById("container")
);
