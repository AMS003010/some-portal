"use client"

import AddPublication from "./components/AddPublication";
import Home from "./components/Home";
import SidePanel from "./components/SidePanel";

import { useState } from "react";

interface MainProps {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function Main() {
  const elementList = [<Home key="0"/>, <AddPublication key="1"/>];
  const [index,setIndex] = useState(1);

  return (
    <div>
      <SidePanel index={index} setIndex={setIndex}/>
      {elementList[index]}
    </div>
  );
}
