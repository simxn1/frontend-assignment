import {Dispatch, SetStateAction} from "react";

export function toggleState(setState: Dispatch<SetStateAction<boolean>>) {
    setState((prevState: boolean) => !prevState);
}
