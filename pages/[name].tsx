import Header from "../components/Header";
import {ICategory, IImage} from "../lib/interfaces";
import ImagePreview from "../components/ImagePreview";
import UploadImage from "../components/UploadImage";
import React, {useEffect, useState} from "react";
import Overlay from "../components/Overlay";
import GalleryCarousel from "../components/GalleryCarousel";
import {getCategory} from "../lib/api";
import {useRouter} from "next/router";

interface Props {
    name: string;
    category: ICategory;
}

export default function Category({ name, category }: Props) {
    const [isCarouselOpen, setIsCarouselOpen] = useState<boolean>(false);
    const [carouselSelected, setCarouselSelected] = useState<number>(0);
    const [images, setImages] = useState<IImage[]>(category.images ?? []);

    const router = useRouter();
    useEffect(() => {
        if (!name) {
            router.push("/")
        }
    }, [])

    return (
        <div>
            <Header title="fotogaléria" subtitle={name ?? ""} coverImage={category.images?.length ? category.images[0].fullpath : ""} hasBack={true} />
            <div className="container mt-8 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-16 gap-y-14 place-items-center md:place-items-stretch">
                {images.map((image, index) => {
                    return (
                        <div className="cursor-pointer" key={image.name}>
                            <ImagePreview index={index} setCarouselSelected={setCarouselSelected} setIsCarouselOpen={setIsCarouselOpen} images={images} setImages={setImages} imgPath={image.fullpath} />
                        </div>
                    )
                })}
                <UploadImage galleryName={name ?? ""} />
            </div>
            <Overlay wrapperClassName="flex justify-center w-5/6 md:w-3/4 lg:w-1/2" isOpen={isCarouselOpen} setIsOpen={setIsCarouselOpen} >
                <GalleryCarousel images={category.images ?? []} selected={carouselSelected} setSelected={setCarouselSelected} />
            </Overlay>
        </div>
    )
}

export async function getServerSideProps({ params }: { params: { name: string }}) {
    const name = params?.name;
    const category = await getCategory(name);

    return {
        props: { name: category?.gallery?.name ?? "", category }
    }
}
