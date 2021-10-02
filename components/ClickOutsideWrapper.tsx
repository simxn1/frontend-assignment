import {ReactChild} from "react";
import onClickOutside from 'react-onclickoutside'

interface Props {
    children: ReactChild;
    toggleIsOpen: () => void;
    className: string;
}

const ClickOutsideWrapper = ({children, className, toggleIsOpen}: Props) => {
    // @ts-ignore
    ClickOutsideWrapper.handleClickOutside = () => toggleIsOpen();

    return <div className={className} >{children}</div>
}

const clickOutsideConfig = {
    // @ts-ignore
    handleClickOutside: () => ClickOutsideWrapper.handleClickOutside
};

export default onClickOutside(ClickOutsideWrapper, clickOutsideConfig);
