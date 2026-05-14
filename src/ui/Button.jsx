import React from 'react'
import { GoPlus } from "react-icons/go";

const Button = ({ onClick ,text , logo ,  bg , width , textcolor}) => {
  return (
    <button className={`${bg} ${width}  ${textcolor} w-xl h-10
    rounded-md flex justify-center items-center p-2  gap-2`} onClick={onClick}>
       <span>{logo}</span><span>{text}</span>
    </button>
  )
}

export default Button