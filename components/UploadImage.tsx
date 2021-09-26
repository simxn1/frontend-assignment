import React, {useState} from "react";
import Image from "next/image";
import Heading from "./Heading";
import Overlay from "./Overlay";
import {endpoints} from "../lib/constants";

interface Props {
    galleryName: string;
}

export default function UploadImage({ galleryName }: Props) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [files, setFiles] = useState<FileList | null>();

    function toggleIsOpen() {
        setIsOpen(prevState => !prevState);
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setFiles(event.target.files);
    }

    async function handleSend(event: React.FormEvent) {
        event.preventDefault();

        if (files) {
            let imagesUploaded = [];
            for (const file of Object.entries(files)) {
                const formData = new FormData();
                formData.append("image", file[1]);
                const res = fetch(process.env.NEXT_PUBLIC_API_URL + endpoints.gallery + "/" + galleryName, {
                    method: "POST",
                    body: formData
                });
                imagesUploaded.push(res);
            }

            Promise.all(imagesUploaded)
                .then(() => console.log("uploaded"))
                .catch(err => console.log(err));

            window.location.reload();
        }
    }

    return (
        <>
            <div onClick={toggleIsOpen} style={{ minWidth: "300px", minHeight: "200px", height: "90%", borderRadius: "5px" }} className="bg-white cursor-pointer flex flex-col items-center justify-center gap-3 relative z-10 pb-10 shadow-lg max-w-xs">
                <Image src="/assets/icons/add-photo.svg" height={75} width={75} />
                <Heading label="pridať fotky" className="text-gray-400 font-bold text-center" />
            </div>
            {isOpen &&
            <Overlay isOpen={isOpen} setIsOpen={setIsOpen}>
                <div className="flex flex-col bg-white w-2/3 md:w-1/3 p-4">
                    <Heading label="pridať fotky" className="text-lg text-gray-600" />
                        <div className="relative flex flex-col items-center gap-3 border-2 border-gray-400 border-dashed p-5 my-8">
                            <input
                                onChange={handleChange}
                                className="absolute bg-transparent w-full h-full focus:outline-none opacity-0 cursor-pointer"
                                type="file"
                                accept="image/jpeg"
                                name="image"
                                multiple
                            />
                            <img src="/assets/icons/add-photo.svg" height={75} width={75} alt={""} />
                            <Heading label="sem presuňte fotky" className="text-gray-400 font-bold text-center" />
                            <Heading label="alebo vyberte súbory kliknutím" className="text-gray-400 font-bold text-center" />
                            <Heading label="(jpg)" className="text-gray-400 font-bold text-center" />
                        </div>
                        <button onClick={handleSend} className="self-end text-white text-sm bg-green-500 uppercase px-6 py-4 rounded-sm">+ pridať</button>
                </div>
            </Overlay>
            }
        </>
    )
}
