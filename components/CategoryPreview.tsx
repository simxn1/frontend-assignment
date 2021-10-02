import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import Heading from "./Heading";
import {endpoints, placeholderImgPath} from "../lib/constants";
import {deleteCategory, getCategory} from "../lib/api";
import Overlay from "./Overlay";
import {ICategory} from "../lib/interfaces";
import {toggleState} from "../lib/utils";

interface Props {
 name: string;
 imgPath?: string;
 categories: ICategory[];
 setCategories: Dispatch<SetStateAction<ICategory[]>>;
}

export default function CategoryPreview({ name, imgPath, categories, setCategories }: Props) {
    const [imagesNumberVisible, setImagesNumberVisible] = useState<boolean>(false);
    const [imagesNumber, setImagesNumber] = useState<number>();
    const [isDeleteCheckOpen, setIsDeleteCheckOpen] = useState<boolean>(false);
    const [isErrShown, setIsErrShown] = useState<boolean>(false);

    function getCategoryImgPath() {
        if (imgPath?.length) {
           return process.env.NEXT_PUBLIC_API_URL + endpoints.images + "/350x200/" + imgPath;
        }
        else {
            return placeholderImgPath;
        }
    }

    async function handleDelete() {
        const deleted = await deleteCategory(name);

        if (deleted.status === "ok") {
            setIsDeleteCheckOpen(false);

            const thisCategory = categories.find(category => category.name === name);
            if (thisCategory) {
                const thisCategoryIndex = categories.indexOf(thisCategory);
                setCategories(prevCategories => {
                    const newCategories = [...prevCategories];
                    newCategories.splice(thisCategoryIndex, 1);
                    return newCategories;
                })
            }
        }
        else {
            setIsErrShown(true);
        }
    }

    useEffect(() => {
        (async () => {
            const category = await getCategory(name)

            if (category.images?.length) {
                setImagesNumber(category.images?.length);
            }
            else {
                setImagesNumber(0);
            }
        })()
    }, [])

    return (
        <>
            <div className="relative cursor-pointer category-preview-container" onMouseEnter={() => toggleState(setImagesNumberVisible)} onMouseLeave={() => toggleState(setImagesNumberVisible)}>
                 <Link href={"/" + name}>
                     <a>
                         <div className="relative shadow-lg max-h-60 category-preview">
                             <div className="border-2 border-transparent border-bottom-0">
                                 <div className="title-img" style={{ backgroundImage: `url(${getCategoryImgPath()})` }} />
                             </div>
                             <div className="relative z-10 py-4 border-2 border-gray-100 text-center info border-top-0" >
                                 <Heading label={name} className="text text-gray-600 font-semibold" />
                                 <div className={"text-gray-300 transition opacity duration-500 opacity-0 " + (imagesNumberVisible ? "opacity-100" : "")}>
                                     {imagesNumber ?? ""} fotiek
                                 </div>
                             </div>
                         </div>
                     </a>
                 </Link>
                <div onClick={() => toggleState(setIsDeleteCheckOpen)} className={"flex gap-1 uppercase text-sm text-red-500 absolute -bottom-8 left-1/2 transform -translate-x-1/2 transition opacity duration-500 opacity-0 " + (imagesNumberVisible ? "opacity-100" : "")}>
                    <Image src="/assets/icons/trash.svg" height={14} width={14} alt={""} />
                    zmazať
                </div>
            </div>
            <Overlay isOpen={isDeleteCheckOpen} setIsOpen={setIsDeleteCheckOpen} wrapperClassName="flex flex-col gap-6 items-center bg-white p-5">
                <>
                    <div className="uppercase">
                        naozaj si prajete vymazať kategóriu <strong>{name}</strong>?
                    </div>
                    <button onClick={handleDelete} className="text-white bg-red-500 uppercase px-3 py-2 rounded-sm">potvrdiť</button>
                    {isErrShown &&
                    <div className="text-md font text-red-600 mt-4 p-2 bg-red-100">
                        Pri mazaní kategórie sa vyskytla chyba
                    </div>
                    }
                </>
            </Overlay>
        </>
    )
}
