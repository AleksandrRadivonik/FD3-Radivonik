import React from "react";
import PropTypes from "prop-types";

class RainbowFrame extends React.Component {

    static propTypes = {
        colors: PropTypes.arrayOf(PropTypes.string).isRequired
    };

    render() {
        let frames =
            this.props.colors.reduce((elem, color) =>
                <div style={{border: "solid 5px " + color, padding: "10px", textAlign: "center"}}>
                    {elem}
                </div>, // обертка из слоев <div>
                this.props.children // сначала вложение
            );

        return (
            frames
        );
    }

}

export default RainbowFrame;