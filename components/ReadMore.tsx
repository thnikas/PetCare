'use client'
import React, { useState,useRef,useEffect } from "react";

type Props={
    children:string|null,
    size:number,
    setSize: (value: number) => void;

}

export const ReadMore = ({ children,size,setSize }: Props) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const elementRef = useRef<HTMLDivElement | null>(null); // Specify the type
 useEffect(()=>{
    if(size>20||isReadMore==false){
        if (elementRef.current) {
            const height = elementRef.current.clientHeight;
            setSize(height+140)
          }
    }
    
 },[isReadMore])
    const toggleReadMore = (e:any) => {
      e.preventDefault();
      e.stopPropagation();
      setIsReadMore(!isReadMore);
     
    };
    return (
      <p className="text" ref={elementRef}>
        {isReadMore ?   
        text?text.slice(0, 130):null
         : text}
        <span onClick={(e)=>toggleReadMore(e)} className="read-or-hide">
          {isReadMore ? "...read more" : " show less"}
        </span>
      </p>
    );
  };