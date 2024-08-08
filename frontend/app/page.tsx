"use client"

import SidePanel from "./components/SidePanel";

import ResearchAddOption from "./components/Research/ResearchAddOption";
import ResearchAnalyzeOption from "./components/Research/ResearchAnalyzeOption";
import DaAddOption from "./components/Department-Activity/DA_AddOptions";
import DaAnalyzeOption from "./components/Department-Activity/DA_AnalyzeOptions";
import SaAddOption from "./components/Student-Activity/SA_AddOption";
import SaAnalyzeOption from "./components/Student-Activity/SA_AnalyzeOption";

import { useState } from "react";

interface MainProps {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function Main() {
  const [index,setIndex] = useState(0);
  const elementList = [
    <ResearchAddOption key="0"/>,
    <ResearchAnalyzeOption key="1"/>,
    <DaAddOption key="2"/>,
    <DaAnalyzeOption key="3"/>,
    <SaAddOption key="4"/>,
    <SaAnalyzeOption key="5"/>,
  ];
  

  return (
    <div className="overflow-x-hidden">
      <SidePanel index={index} setIndex={setIndex}/>
      {elementList[index]}
    </div>
  );
}
