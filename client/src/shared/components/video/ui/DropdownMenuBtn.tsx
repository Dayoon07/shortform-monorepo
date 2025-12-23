import React from "react";

interface DropdownMenuBtnProps {
    onClickEventFunc?: (p?: any) => any | void,
    text: string
}

export const DropdownMenuBtn: React.FC<DropdownMenuBtnProps> = ({
    onClickEventFunc, text
}) => {
    return (
        <button type="button" 
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                e.stopPropagation();
                onClickEventFunc?.();
            }} 
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" 
            role="menuitem"
        >{text}</button>
    );
}