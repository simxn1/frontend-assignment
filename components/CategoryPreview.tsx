import React, {useEffect, useState} from "react";
import Link from "next/link";
import Heading from "./Heading";
import {endpoints, placeholderImgPath} from "../lib/constants";

interface Props {
 name: string;
 imgPath?: string;
}

export default function CategoryPreview({ name, imgPath }: Props) {
    const [imagesNumberVisible, setImagesNumberVisible] = useState<boolean>(false);
    const [imagesNumber, setImagesNumber] = useState<number>();

    function getCategoryImgPath() {
        if (imgPath?.length) {
           return process.env.NEXT_PUBLIC_API_URL + endpoints.images + "/350x200/" + imgPath;
        }
        else {
            return placeholderImgPath;
        }
    }

    function toggleImagesNumberVisible() {
        setImagesNumberVisible((prevValue) => !prevValue);
    }

    useEffect(() => {
        (async () => {
            const res = await fetch(process.env.NEXT_PUBLIC_API_URL + endpoints.gallery + "/" + name);
            const json = await res.json();

            if (json.images?.length) {
                setImagesNumber(json.images?.length);
            }
            else {
                setImagesNumber(0);
            }
        })()
    }, [])

    return (
         <Link href={"/" + name}>
             <a onMouseEnter={toggleImagesNumberVisible} onMouseLeave={toggleImagesNumberVisible}>
                 <div style={{ minWidth: "300px" }} className="relative z-10 my-4 shadow-lg max-h-60">
                     <div className="border-2 border-transparent" style={{ borderBottom: 0 }}>
                         <div className={(imagesNumberVisible ? "h-36" : "h-44")} style={{ backgroundImage: `url(${getCategoryImgPath()})`, borderRadius: "5px 5px 0 0" }} />
                     </div>
                     <div className={(imagesNumberVisible ? "h-24" : "h-16") + " py-4 border-2 border-gray-100 text-center"} style={{ borderTop: 0, borderRadius: "0 0 5px 5px" }}>
                         <Heading label={name} className="text text-gray-600 font-semibold" />
                         <div className={"text-gray-300 transition opacity duration-500 opacity-0 " + (imagesNumberVisible ? "opacity-100" : "")}>
                             {imagesNumber ?? ""} fotiek
                         </div>
                     </div>
                 </div>
             </a>
         </Link>
    )
}
