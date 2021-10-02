import React, {Dispatch, SetStateAction, useEffect} from "react";
import {IImage} from "../lib/interfaces";
import Image from "next/image";
import {endpoints} from "../lib/constants";

interface Props {
    images: IImage[];
    selected: number;
    setSelected: Dispatch<SetStateAction<number>>;
}

export default function GalleryCarousel({ images, selected, setSelected }: Props) {
    function getImgPath(fullPath: string) {
        return process.env.NEXT_PUBLIC_API_URL + endpoints.images + "/800x500/" + fullPath;
    }

    function handleNext() {
        console.log("Next")
        console.log(selected)
        if (selected <= images.length - 1) {
            setSelected(prevValue => prevValue + 1)
        }
    }

    function handlePrev() {
        console.log("Prev")
        console.log(selected)
        if (selected > 0) {
            setSelected(prevValue => prevValue - 1)
        }
    }

    useEffect(() => {
        addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft") {
                handlePrev();
            }
            else if (event.key === "ArrowRight") {
                handleNext();
            }
        })
    }, [])

    return (
        <>
            <Image className="cursor-pointer" onClick={handlePrev} src="/assets/icons/prev.svg" height={25} width={25} alt={""} />
            <img className="w-5/6 mx-5" src={getImgPath(images[selected]?.fullpath)} />
            <Image className="cursor-pointer" onClick={handleNext} src="/assets/icons/next.svg" height={25} width={25} alt={""} />
        </>
    )
}
