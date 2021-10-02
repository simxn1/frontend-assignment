import React, {Dispatch, ReactChild, SetStateAction, useEffect} from "react";
import Image from "next/image";
import ClickOutsideWrapper from "./ClickOutsideWrapper";
import {toggleState} from "../lib/utils";

interface Props {
    children: ReactChild;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    wrapperClassName: string;
}

export default function Overlay({ children, isOpen, setIsOpen, wrapperClassName }: Props) {
    useEffect(() => {
        addEventListener("keydown", (event: KeyboardEvent) => {
            if (event.key == "Escape") {
                setIsOpen(false);
            }
        })
    }, [])

    return isOpen ? (
            <div className="w-screen h-screen fixed top-0 left-0 z-50 overlay">
                <div className="w-full flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div onClick={() => toggleState(setIsOpen)} className="text-white flex justify-center uppercase cursor-pointer relative top-0 right-0 my-3">
                        <Image src="/assets/icons/delete.svg" height={25} width={25} alt={""} />
                        zavrieť
                    </div>
                    <ClickOutsideWrapper className={wrapperClassName} toggleIsOpen={() => toggleState(setIsOpen)}>
                        {children}
                    </ClickOutsideWrapper>
                </div>
            </div>
    ) : null;
}
