import Image from "next/image";
import { MouseEventHandler } from "react";

type Props = {
    title: string,
    leftIcon?: string | null,
    rightIcon?: string | null,
    handleClick?: MouseEventHandler,
    submitting?: boolean | false,
    type?: 'button' | 'submit',
    bgColor?: string,
    textColor?: string,
    customClass?:string|''
}

const Button = ({ title, leftIcon, rightIcon, handleClick, submitting, type, bgColor, textColor,customClass }: Props) => (//button component that is used in many cases in the web page
    <button 
        type={type || 'button'}
        disabled={submitting || false}
        className={`flexCenter gap-3 px-4 py-3 bt_col
        ${textColor ? textColor : 'text-white'} 
        ${submitting ? 'bg-black/50' : bgColor }  rounded-xl text-sm font-medium max-md:w-full ${customClass} `}
        onClick={handleClick}
    >
        {leftIcon && <Image src={leftIcon} width={14} height={14} alt="left icon" />}
        {title}
        {rightIcon && <Image src={rightIcon} width={14} height={14} alt="right icon" />}
    </button>
)

export default Button;