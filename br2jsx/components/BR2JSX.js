import React from "react";
import PropTypes from "prop-types";

import "./BR2JSX.css";
class BR2JSX extends React.Component {

    static propTypes = {
        text: PropTypes.string.isRequired
    };

    render() {
        // Формирование массива с чередующимися строками и тэгами <br>
        let textWithBr =
            this.props.text.split(/<br\s*\/?>/g).reduce((ar, t, i) =>
                i === 0 ? [...ar, t] : [...ar, <br key={i}/>, t],
                []
            );

        return (
            <div className="br2jsx">
                {textWithBr}
            </div>
        );
    }

}

export default BR2JSX;