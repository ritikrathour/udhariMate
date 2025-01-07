import React from "react";
import { Link } from "react-router-dom";
 
const Button = ({text})=>{
    return <Link to="/signup" className="bg-[#469bbf] px-4 py-2 text-[14px] inline-block w-full text-center rounded-full text-white">{text}</Link>
}
export default Button;