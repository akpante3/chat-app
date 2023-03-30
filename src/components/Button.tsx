import React from "react";
import "./Button.scss";
import Icons from "./Icons";

interface Props {
  text?: string;
  icon?: "arrow-up" | "arrow-down" | "send";
  handleClick?: Function;
  isDisabled: boolean,
  width?: string,
  height?: string,
  fontSize?: string,
  classes?: string[]
}

const Button: React.FC<Props> = ({ text, icon, handleClick, isDisabled, width, height, fontSize, classes }) => {
    const buttonStyle = {
        width: width || '140px',
        height: '',
        fontSize: fontSize || '16px'
      };
  return (
    <button style={buttonStyle} disabled={isDisabled} type="submit" className={`button ${classes?.join(" ")}`} onClick={() => handleClick?.()}>
      {text} {icon && <Icons name={icon} />}
    </button>
  );
};

export default Button;
