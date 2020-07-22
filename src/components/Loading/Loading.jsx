import React from "react";
import PropTypes from "prop-types";
// import classNames from 'classnames'
import "./Loading.css";

export default function Spinner({ color, style }) {
  const circles = [...Array(12)].map((_, index) => {
    return (
      <div key={index}>
        <div className="div-after" style={{ background: color }}></div>
      </div>
    );
  });

  return (
    <div className="lds-spinner" style={{ ...style }}>
      {circles}
    </div>
  );
}

Spinner.propTypes = {
  /** hex color */
  color: PropTypes.string,
  /** class name  */
  // className: PropTypes.string,
  /** style object */
  style: PropTypes.object,
};

Spinner.defaultProps = {
  color: "#7f58af",
  className: "",
  style: {},
};
