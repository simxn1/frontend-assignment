import React, {useState} from "react";
import Heading from "./Heading";
import Image from "next/image";
import Overlay from "./Overlay";
import {endpoints} from "../lib/constants";

interface Props {
}

export default function CreateGallery({ }: Props) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [galleryName, setGalleryName] = useState<string>("");

    function toggleIsOpen() {
        setIsOpen(prevState => !prevState);
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setGalleryName(event.target.value);
    }

    async function handleAddGallery() {
        if (galleryName.length >= 1) {
            const res = await fetch(process.env.NEXT_PUBLIC_API_URL + endpoints.gallery, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: galleryName })
            })
            const json = await res.json();
            if (json.path && json.name) {
                window.location.reload();
            }
        }
    }

    return (
        <>
            <div onClick={toggleIsOpen} style={{ minWidth: "300px", minHeight: "200px", height: "90%", borderRadius: "5px" }} className="cursor-pointer flex flex-col items-center justify-center gap-3 relative z-10 pb-10 shadow-lg max-w-xs">
                <Image src="/assets/icons/plus.svg" height={50} width={50} />
                <Heading label="pridať kategóriu" className="text-gray-400 font-bold text-center" />
            </div>
            {isOpen &&
            <Overlay isOpen={isOpen} setIsOpen={setIsOpen}>
                <div className="bg-white w-2/3 md:w-1/2 lg:w-1/3 p-4">
                    <Heading label="pridať kategóriu" className="text-lg text-gray-600 mb-4" />
                    <div className="flex flex-col">
                        <div className="flex flex-col sm:flex-row my-2">
                            <input value={galleryName} onChange={handleChange} className="text-base uppercase flex-1 focus:border-0 focus:outline-none pl-2 mb-6 sm:mb-0" placeholder="zadajte názov kategórie" type="text" />
                            <button onClick={handleAddGallery} className="text-white self-center text-sm bg-green-500 uppercase px-6 py-4 rounded-sm">+ pridať</button>
                        </div>
                        <div className="w-full h-1 bg-gray-100 mt-1 hidden sm:block" />
                    </div>
                </div>
            </Overlay>
            }
        </>
    )
}
