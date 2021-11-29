import React from "react";

let withRainbowFrame = colors => Component => props =>
    colors.reduce(
        (elems, color) => <div style={{border: "solid 5px " + color, padding: "10px", textAlign: "center"}}>{elems}</div>, // потом несколько слоев <div>
        <Component {...props} /> // сначала сам компонент
    );

export default withRainbowFrame;