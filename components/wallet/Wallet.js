import Image from "next/image";
import { useState } from "react";

export default function Wallet({icon, description, wallet, setSelectedWallet}) {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <li className="flex items-center cursor-pointer" onMouseOver={() => {setIsHovering(true)}} onMouseOut={() => {setIsHovering(false)}}  onClick={() => {setSelectedWallet(wallet)}}> 
      <p className={`font-bold mr-2 text-2xl mb-2 transition-opacity duration-300 ease-in-out ${isHovering ? "opacity-100" : "opacity-0"}`}>{`>`}</p>
      <div className={`relative h-10 w-10 mr-2 transition-transform duration-300 ease-in-out ${isHovering ? "scale-105" : "scale-100"}`}>
        <Image src={icon} alt={description} fill/>
      </div>
      <p className={`transition-all duration-300 ease-in-out lowercase ${isHovering ? "font-bold" : "font-light"}`}>{description}</p>
      <p className="font-bold ml-2 text-2xl mb-2 opacity-0">{`>`}</p>
    </li>
  )
}