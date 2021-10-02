import React, {Dispatch, SetStateAction, SyntheticEvent, useState} from "react";
import {endpoints} from "../lib/constants";
import Image from "next/image";
import Loader from "./Loader";
import Overlay from "./Overlay";
import {deleteImage} from "../lib/api";
import {IImage} from "../lib/interfaces";
import {toggleState} from "../lib/utils";

interface Props {
    imgPath: string;
    images: IImage[];
    setImages: Dispatch<SetStateAction<IImage[]>>;
    setIsCarouselOpen: Dispatch<SetStateAction<boolean>>;
    setCarouselSelected: Dispatch<SetStateAction<number>>;
    index: number;
}

export default function ImagePreview({ imgPath, images, setImages, setIsCarouselOpen, setCarouselSelected, index}: Props) {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isDeleteCheckOpen, setIsDeleteCheckOpen] = useState<boolean>(false);

    function getImgPath() {
        return process.env.NEXT_PUBLIC_API_URL + endpoints.images + "/350x250/" + imgPath
    }

    function handleLoad() {
        setLoaded(true);
    }

    function handleError(event: SyntheticEvent<HTMLImageElement, Event>) {
        (event.target as HTMLImageElement).onerror = null;
        (event.target as HTMLImageElement).src = "/assets/img/image-placeholder.png";
    }

    async function handleDelete() {
        const deleted = await deleteImage(imgPath);

        if (deleted.status === "ok") {
            setIsDeleteCheckOpen(false);

            const thisImage = images.find(image => image.fullpath === imgPath);
            if (thisImage) {
                const thisImageIndex = images.indexOf(thisImage);
                setImages(prevImages => {
                    const newImages = [...prevImages];
                    newImages.splice(thisImageIndex, 1);
                    return newImages;
                })
            }
        }
    }

    function handleOpenCarousel(index: number) {
        setCarouselSelected(index);
        setIsCarouselOpen(true);
    }

    return (
        <>
            <div className="relative" onMouseEnter={() => toggleState(setIsHovered)} onMouseLeave={() => toggleState(setIsHovered)}>
                <div onClick={() => handleOpenCarousel(index)} className={"relative z-10 max-w-xs image-preview" + (loaded ? " shadow-lg" : "")}>
                    <img
                        onLoad={handleLoad}
                        onError={handleError}
                        className={"relative z-10 " + loaded ? "" : "hidden"}
                        src={getImgPath()}
                        alt=""
                    />
                    {loaded ? null :
                    <div className="flex justify-center items-center h-64">
                        <Loader />
                    </div>
                    }
                </div>
                <div onClick={() => toggleState(setIsDeleteCheckOpen)} className={"flex gap-1 uppercase text-sm text-red-500 absolute -bottom-8 left-1/2 transform -translate-x-1/2 transition opacity duration-500 opacity-0" + (isHovered ? " opacity-100" : "")}>
                    <Image src="/assets/icons/trash.svg" height={14} width={14} alt={""} />
                    zmazať
                </div>
            </div>
            <Overlay isOpen={isDeleteCheckOpen} setIsOpen={setIsDeleteCheckOpen} wrapperClassName="flex flex-col gap-6 items-center bg-white p-5">
                <>
                    <div className="uppercase">
                        naozaj si prajete zmazať tento obrázok?
                    </div>
                    <button onClick={handleDelete} className="text-white bg-red-500 uppercase px-3 py-2 rounded-sm">potvrdiť</button>
                </>
            </Overlay>
        </>
    )
}
