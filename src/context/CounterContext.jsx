import { createContext, useState } from "react";
export let CounterContext =createContext(0);

 export default function CounterContextProvider(props){
    const[counter,setCounter]=useState(0)
    const[userName,setuserName]=useState('')
  
    return <CounterContext.Provider value={{counter , userName , setCounter}}>
            {props.children}
    </CounterContext.Provider>

}