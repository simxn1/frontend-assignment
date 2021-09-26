import React, {useState} from "react";
import {IImage} from "../lib/interfaces";
import Image from "next/image";
import {endpoints} from "../lib/constants";

interface Props {
    images: IImage[];
    selectedFromGallery: number;
}

export default function GalleryCarousel({ images, selectedFromGallery }: Props) {
    const [selected, setSelected] = useState<number>(selectedFromGallery);

    function getImgPath(fullPath: string) {
        return process.env.NEXT_PUBLIC_API_URL + endpoints.images + "/800x500/" + fullPath;
    }

    function handleNext() {
        if (selected < images.length - 1) {
            setSelected(prevValue => prevValue + 1)
        }
    }

    function handlePrev() {
        if (selected > 0) {
            setSelected(prevValue => prevValue - 1)
        }
    }

    return (
        <div className="flex justify-center w-1/2">
            <Image className="cursor-pointer" onClick={handlePrev} src="/assets/icons/prev.svg" height={25} width={25} alt={""} />
            <img className="w-5/6 mx-5" src={getImgPath(images[selected].fullpath)} />
            <Image className="cursor-pointer" onClick={handleNext} src="/assets/icons/next.svg" height={25} width={25} alt={""} />
        </div>
    )
}
