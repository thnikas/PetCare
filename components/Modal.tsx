"use client";

import { useCallback, useRef, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

{/**Modal that is used in order to fill petform profileform etc */}
export default function Modal({ children,customClass,customData,goBack }: { children: ReactNode,customClass?:string,customData?:string,goBack?:boolean }) {
    const overlay = useRef<HTMLDivElement>(null);
    const wrapper = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const someObj:any = children;//used for the router push
    const field = 1;
    const temp = someObj[field as keyof any]
    const checkShow=someObj[0 as keyof any]
    
    const onDismiss = useCallback(() => {  
        if(temp.props.type=='edit'||checkShow.props.typeof=='Show'){
            router.push(`/profile/${customData}`)
            router.refresh()

        }
        if(goBack){
            router.back(); // Navigate back to the previous page

        }
        else{
            router.push("/");

        }
            
    }, [router]);
    const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target === overlay.current) && onDismiss) {
            onDismiss();
        }
    }, [onDismiss, overlay]);
    return (
        <div ref={overlay} className="modal" onClick={(e) => handleClick(e)}>{/**the X button that is showed */}
            <button type="button" onClick={onDismiss} className="absolute top-4 right-8">
                <Image src="/close.svg" width={17} height={17} alt="close" />
            </button>

            <div ref={wrapper} className={`${customClass} modal_wrapper  `}>
                {children}
            </div>
        </div>
    );
}