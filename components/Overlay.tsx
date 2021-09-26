import React, {Dispatch, ReactChild, SetStateAction} from "react";
import Image from "next/image";

interface Props {
    children: ReactChild;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Overlay({ children, isOpen, setIsOpen }: Props) {

    function toggleIsOpen() {
        setIsOpen(prevState => !prevState);
    }

    return isOpen ? (
        <div className="w-screen h-screen fixed top-0 left-0 z-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.55)"}}>
            <div className="w-full flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div onClick={toggleIsOpen} className="text-white flex justify-center uppercase cursor-pointer relative top-0 right-0 my-3">
                    <Image src="/assets/icons/delete.svg" height={25} width={25} alt={""} />
                    zavrieť
                </div>
                {children}
            </div>
        </div>
    ) : null;
}
