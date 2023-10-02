import React,{useState} from 'react'
type Props={
    day:string,
    daysBoo:boolean,
    setState:(value:string) =>void
    alldays:any
    // key:number
}
const DayPick = ({day,daysBoo,setState,alldays}:Props) => {//the day picker where the user choose which day he is available
    const classActive='sitter-color_a sitter-day' 
    const classInactive='sitter-color_in sitter-day'
    const [classA,setClassA]=useState(daysBoo==false?classInactive:classActive)
    const handleClick=()=>{
        if(classA==classInactive){
            setClassA(classActive)
            setState({ ...alldays, [day.toLowerCase()]:true })   //change the forme state and to Lowercase in order to be able to compare this with filters when is needed

        }else{
            setClassA(classInactive)
            setState({ ...alldays, [day.toLowerCase()]:false })   

        }
    }
   
    return (
        <button type='button' onClick={()=>handleClick()} className={classA}>
            <h4>{day}</h4>
        </button>
    )
}

export default DayPick