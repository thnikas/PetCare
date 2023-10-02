"use client"
import React, { useState,useEffect } from 'react'

import { FilterSitters } from '@/common.types'

type Props={
    title:string,
    filtersState:FilterSitters,
    sitterData:any,
  setSitterData:(value:string) =>void
}
const FilterButton = ({title,filtersState,sitterData,setSitterData}:Props) => {
    let array:any=[]
    const setFilters =()=>{//executes when the user press the button

    const filteredSitters = sitterData.filter((person:any) => {//changes array based on the selected filters then this changed array goes to the next function and changes based on the next filter
      for (const key in person.node.service) {
        if (
          filtersState.service.hasOwnProperty(key) &&
          person.node.service[key] === true &&
          filtersState.service[key] === true
        ) {
          return true; // Include the person in the filtered array
        }
      }
      return false; // Exclude the person from the filtered array
    });
    const filteredSittersDay=filteredSitters.filter((person:any)=>{//filter based on the calendar picking days
      if(filtersState.dates.dayA&&filtersState.dates.dayB){
        for (const day in person.node.daysA) {
          if ((person.node.daysA[day] === true&&filtersState.dates.dayA.toLocaleLowerCase()==day)||(person.node.daysA[day] === true&&filtersState.dates.dayB.toLocaleLowerCase()==day)) {
            return true; // Include the person in the filtered array
          }

        }    
        return false;           // Exclude the person from the filtered array
      }
      return true
        })
    const filteredSittersPrice= filteredSittersDay.filter((person:any)=>{//filter based on the money range
      if(filtersState.money.moneyA&&filtersState.money.moneyO){
        if(filtersState.money.moneyA<=person.node.moneyD+5&&filtersState.money.moneyO>=person.node.moneyD+5){
          return true;
        }
        return false
      }
      return true
    }) 

    const filteredSittersTypes=filteredSittersPrice.filter((person:any)=>{//filter based on the pet size
      if(Object.keys(filtersState.sizePets).every((size) => !filtersState.sizePets[size])){
        return true
    }
      for (const key in person.node.sizePets) {
        if (
          filtersState.sizePets.hasOwnProperty(key) &&
          person.node.sizePets[key] === true &&
          filtersState.sizePets[key] === true
        ) {
          return true; // Include the person in the filtered array
        }
      }
      return false; // Exclude the person from the filtered array
    })
    filteredSittersTypes.map((filteredPerson:any) => {
      array.push(filteredPerson)
      
    });

    setSitterData(array)
  }
       
      
     
 
  return (
    <div className='hidden-xs col-sm-3 col-md-4 -mt-16 mb-8'>
     
       
     
        <button onClick={() => 
          // setShowDialog(true),
          setFilters()} className={`buttonSF`}>
        {title}        
</button>
    

    </div>
  );
}

export default FilterButton