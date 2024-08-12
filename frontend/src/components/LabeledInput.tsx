import { ChangeEvent, useState } from "react";

interface inputtype{
    label:string;
    placeholder:string;
    onchange:(e:ChangeEvent<HTMLInputElement>)=> void;
    type?:string;

}
export default function LabeledInput({label,placeholder,onchange ,type}:inputtype){
  
    return(
        <div className="">
            <label  className="block pb-1 font-bold text-sm font-medium text-black">{label}</label>
            <input type={type || "text"}  onChange={onchange} id="first_name" className=" mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
        </div>
    )
}