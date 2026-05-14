import React, { createContext, useContext, useState } from "react";




 const HeadWord = createContext()

 export const Topbarhead = ({children}) => {
     const [word , setWord] = useState('Dashboard');
  return (
     <HeadWord.Provider value={{word , setWord}}>{children}</HeadWord.Provider>
  )
}

 export const useHeaderWord = () => useContext(HeadWord)