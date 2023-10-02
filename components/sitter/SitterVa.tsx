import { SitterServices } from '@/common.types'
import React,{useState,useEffect} from 'react'
import Services from './sitterProfile/Services'
import Types from './sitterProfile/Types'
import DatesAv from './sitterProfile/DatesAv'
import { DayCalendarSkeleton } from '@mui/x-date-pickers'

type Props={
   
    sitter:SitterServices|undefined,
    name:string|undefined
  }

const SitterVa = ({sitter,name}:Props) => {
  // let array = [] as number[];
  const [array,setArray]=useState<number[]>([])
  const [first,setFirst]=useState(true)
  const [showSkeleton, setShowSkeleton] = useState(true);
  useEffect(() => {
    
  }, []);
  const convertNum = () => {
   
      let num=[] as number[]
      const daysA = sitter?.daysA;
      const dayMap = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
      
      if (daysA) {
        for (let i = 0; i < dayMap.length; i++) {
          if (daysA[dayMap[i]] === true) {
            num.push(i);
          }
        }
      }
      setArray(num)
    
    
  }
  useEffect(()=>{
    convertNum()
  },[sitter])
   
    return (
    <div>
        <Services servicesSitter={sitter?.service} servicePriceD={sitter?.moneyD} servicePriceH={sitter?.moneyH}/>
        <Types petTypes={sitter?.sizePets} name={name}/>
        {array.length>0? <DatesAv  daysA={array}/>:<DayCalendarSkeleton style={{width:'17.7rem'}}/>}
       
    </div>
  )
}

export default SitterVa