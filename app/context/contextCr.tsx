"use client"
import React, { useState } from 'react';

interface IGlobalContextProps {
    loader:boolean,
    setLoader:(loader: any) => void;
  }

  export const GlobalContext = React.createContext<IGlobalContextProps>({//context values that used in the components
    loader:false,
    setLoader:()=>{}
  });

  export const ContextCr=(props:any)=>{//context value that can be in used in the whole app. When loader is trued loader is showed
    const [loader, setLoader]=useState(false)
    return (
        <GlobalContext.Provider
          value={{
            loader:loader,
            setLoader:setLoader
          }}
        >
          {props.children}
        </GlobalContext.Provider>
      );
  }