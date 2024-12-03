"use client"
import React, { createContext, useState } from "react";

export const ConversionContext = createContext<{ conversion: number, setConversion:Function}>({
    conversion:0.9506,
    setConversion: () => {},
});


export const ConversionContextProvider = ({ children }: { children: React.ReactNode}):React.ReactNode => {
  const [conversion, setConversion] = useState(0.9506);

  return (
    <ConversionContext.Provider value={{conversion,setConversion}}>
      {children}
    </ConversionContext.Provider>
  );
}