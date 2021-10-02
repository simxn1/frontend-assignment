import React, {Dispatch, SetStateAction, useState} from "react";
import Heading from "./Heading";
import Image from "next/image";
import Overlay from "./Overlay";
import {createCategory} from "../lib/api";
import {ICategory} from "../lib/interfaces";
import { useRouter } from "next/router";

interface Props {
    setCategories: Dispatch<SetStateAction<ICategory[]>>;
}

export default function CreateGallery({ }: Props) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [galleryName, setGalleryName] = useState<string>("");
    const [errShown, setErrShown] = useState<boolean>(false);
    const [err, setErr] = useState<string>("");

    const router = useRouter();

    function toggleIsOpen() {
        setIsOpen(prevState => !prevState);
        setErrShown(false);
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setGalleryName(event.target.value);
    }

    async function handleAddGallery() {
        const createdCategory = await createCategory(galleryName);
        if (createdCategory.name && createdCategory.path) {
            setErrShown(false);
            await router.push(createdCategory.path);
        }
        else {
            showErr(createdCategory.code, createdCategory.message);
        }
    }

    function showErr(code?: number, message?: string) {
        if (code === 409) {
            setErr("Galéria so zadaným názvom už existuje");
        }
        else if (message) {
            setErr(message);
        }
        else {
            setErr("Pri vytváraní galérie sa vyskytla chyba");
        }
        setErrShown(true);
    }

    return (
        <>
            <div onClick={toggleIsOpen}  className="cursor-pointer flex flex-col items-center justify-center gap-3 relative z-10 pb-10 shadow-lg max-w-xs create-gallery">
                <Image src="/assets/icons/plus.svg" height={50} width={50} alt={""} />
                <Heading label="pridať kategóriu" className="text-gray-400 font-bold text-center" />
            </div>
            {isOpen &&
            <Overlay wrapperClassName="bg-white w-2/3 md:w-1/2 lg:w-1/3 p-4" isOpen={isOpen} setIsOpen={setIsOpen}>
                <>
                    <Heading label="pridať kategóriu" className="text-lg text-gray-600 mb-4" />
                    <div className="flex flex-col">
                        <div className="flex flex-col sm:flex-row my-2">
                            <input value={galleryName} onChange={handleChange} className="text-base uppercase flex-1 focus:border-0 focus:outline-none pl-2 mb-6 sm:mb-0" placeholder="zadajte názov kategórie" type="text" />
                            <button onClick={handleAddGallery} className="text-white self-start sm:self-center text-sm bg-green-500 uppercase px-6 py-4 rounded-sm">+ pridať</button>
                        </div>
                        <div className="w-full h-1 bg-gray-100 mt-1 hidden sm:block" />
                        {errShown &&
                            <div className="text-md font text-red-600 mt-4 p-2 bg-red-100">
                                {err}
                            </div>
                        }
                    </div>
                </>
            </Overlay>
            }
        </>
    )
}
