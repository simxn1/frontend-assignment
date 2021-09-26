import Header from "../components/Header";
import {IImage} from "../lib/interfaces";
import ImagePreview from "../components/ImagePreview";
import UploadImage from "../components/UploadImage";
import React, {useState} from "react";
import Overlay from "../components/Overlay";
import GalleryCarousel from "../components/GalleryCarousel";
import {endpoints} from "../lib/constants";

interface Props {
    name: string;
    titleImgPath: string;
    images: IImage[];
}

export default function Category({ name, titleImgPath, images }: Props) {
    const [isCarouselOpen, setIsCarouselOpen] = useState<boolean>(false);
    const [carouselSelected, setCarouselSelected] = useState<number>(0);

    function handleOpenCarousel(index: number) {
        setCarouselSelected(index);
        setIsCarouselOpen(true);
    }

    return (
        <div>
            <Header title="fotogaléria" subtitle={name} coverImage={titleImgPath} hasBack={true} />
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
                {images && images.map((image, index) => {
                    return (
                        <div className="cursor-pointer" onClick={() => handleOpenCarousel(index)} key={image.name}>
                            <ImagePreview imgPath={image.fullpath} />
                        </div>
                    )
                })}
                <UploadImage galleryName={name} />
            </div>
            <Overlay isOpen={isCarouselOpen} setIsOpen={setIsCarouselOpen} >
                <GalleryCarousel images={images} selectedFromGallery={carouselSelected} />
            </Overlay>
        </div>

    )
}

export async function getServerSideProps({ params }: { params: { name: string }}) {
    const name = params.name;

    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + endpoints.gallery + "/" + name)
    const json = await res.json();

    return {
        props: { name, titleImgPath: json.images[0]?.fullpath ?? null, images: json.images }
    }
}
