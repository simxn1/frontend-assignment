import React from "react";
import Image from "next/image";
import Link from "next/link";
import Heading from "./Heading";
import {endpoints, placeholderImgPath} from "../lib/constants";

interface Props {
    coverImage?: string;
    title: string;
    subtitle: string;
    hasBack: boolean;
}

export default function Header({ coverImage, title, subtitle, hasBack }: Props) {
    function getImgPath() {
        if (coverImage) {
            return process.env.NEXT_PUBLIC_API_URL + endpoints.images + "/1920x450/" + coverImage;
        }
        else {
            return placeholderImgPath;
        }
    }

    return (
        <div>
            <div className="overflow-hidden absolute">
                <div
                    className="w-screen h-80 filter blur"
                    style={{ backgroundImage: `url("${getImgPath()}")` }}
                />
            </div>
            <div className="mx-8 sm:container md:mx-auto pt-20 relative z-10">
                <Heading className="text-2xl" label={title} />
                <div className="flex items-center mt-10">
                    {hasBack && <Link href="/">
                        <a>
                            <Image src="/assets/icons/arrow.svg" height={30} width={30} alt={""} />
                        </a>
                    </Link>}
                    <Heading className="text-lg ml-4" label={subtitle} />
                </div>
                <div className="w-full h-0.5 my-2 header-border" />
            </div>
        </div>
    )
}
