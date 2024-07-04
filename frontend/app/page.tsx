"use client"

import SidePanel from "./components/SidePanel";

import PubDashboard from "./components/Publication/PubDashboard";
import AddPublication from "./components/Publication/AddPublication";
import PubMyPublications from "./components/Publication/PubMyPublications";
import PubCompareSection from "./components/Publication/PubCompareSection";

import FdpDashboard from "./components/FDP/FdpDashboard";
import AddFdp from "./components/FDP/AddFdp";
import FdpMyFDPs from "./components/FDP/FdpMyFDPs";
import FdpCompareSection from "./components/FDP/FdpCompareSection";

import { useState } from "react";

interface MainProps {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function Main() {
  const [index,setIndex] = useState(0);
  const elementList = [
    <PubDashboard key="0"/>,
    <PubMyPublications key="1"/>,
    <AddPublication key="2"/>,
    <PubCompareSection key="3"/>,
    <FdpDashboard key="4"/>,
    <FdpMyFDPs key="5"/>,
    <AddFdp key="6"/>,
    <FdpCompareSection key="7"/>,
  ];
  

  return (
    <div className="overflow-x-hidden">
      <SidePanel index={index} setIndex={setIndex}/>
      {elementList[index]}
    </div>
  );
}
