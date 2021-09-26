import React from "react";

interface Props {
    label: string;
    className?: string
}

export default function Heading({ label, className }: Props) {
    return (
        <div className={"text-white uppercase tracking-wider " + className ?? ""}>
            {label}
        </div>
    )
}
