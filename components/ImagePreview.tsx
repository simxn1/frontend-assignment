import React from "react";
import {endpoints} from "../lib/constants";

interface Props {
    imgPath: string;
}

export default function ImagePreview({ imgPath }: Props) {
    function getImgPath() {
        return process.env.NEXT_PUBLIC_API_URL + endpoints.images + "/350x250/" + imgPath
    }

    return (
        <div className="relative z-10 my-4 shadow-lg max-w-xs mx-4">
            <img style={{ borderRadius: "5px" }} src={getImgPath()} alt=""/>
        </div>
    )
}
