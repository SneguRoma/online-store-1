import React from "react";
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import classes from './Input.module.css'

const Input = (props:DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>):JSX.Element =>{
  return (
    <input className={classes.input} {...props}/>
  );
};

export default Input;