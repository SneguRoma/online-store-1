import React from 'react';
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import classes from "./Button.module.css";

const Button = ({children, ...props}:DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>): JSX.Element => {
  return(
    <button {...props} className={`button ${classes.button}`}>
      {children}
    </button>
  )}

export default Button;