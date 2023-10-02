import React,{useState} from 'react'
import Image from 'next/image';

type Props={
    checked:boolean,
    label:string,
    icon:string,
    classC:string
    setState:(value:string) =>void
    size:string
    object:any
    iconsSize:number
    textStyle:string
}
const Check = ({checked,label,icon,classC,setState,size,object,iconsSize,textStyle}:Props) => {//the check box that exists when the user creates sitter profile and there the user can choose which type of pets he can pet
    const [isChecked, setIsChecked] = useState(checked==true?true:false);
    const change=()=>{//change the tick
      if(isChecked==true){
        setIsChecked(false)
        setState({ ...object, [size]:false })   
      }else{
        setIsChecked(true)
        setState({ ...object, [size]:true })   
      }
    }
  return (
    <div className={classC}>
      <div className="checkbox-wrapper ">
        <input className={isChecked ? "checked" : ""}
          type='checkbox' checked={isChecked} onChange={() => change()}
        /> 
      </div>
      <Image src={icon} width={iconsSize} height={iconsSize} alt="sDog" />
      <h4 className={textStyle}>{label}</h4>
    </div>
   
  )
}

export default Check