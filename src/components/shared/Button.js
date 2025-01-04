import React from "react";

function Button({ onClick, children, style, ...otherProps }) {
  return (
    <button onClick={onClick} style={style} {...otherProps}>
      {children}
    </button>
  );
}

export default Button;
