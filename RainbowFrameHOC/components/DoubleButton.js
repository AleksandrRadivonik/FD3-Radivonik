import React from "react";
import PropTypes from "prop-types";

const DoubleButton = ({children, caption1, caption2, cbPressed}) =>
    <div>
        <input type="button" value={caption1} onClick={() => cbPressed(1)} />
        {children}
        <input type="button" value={caption2} onClick={() => cbPressed(2)} />
    </div>;

DoubleButton.propTypes = {
    caption1: PropTypes.string.isRequired,
    caption2: PropTypes.string.isRequired,
    cbPressed: PropTypes.func.isRequired
};

export default DoubleButton;