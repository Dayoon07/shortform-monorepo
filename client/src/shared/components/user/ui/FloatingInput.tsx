import { ChangeEvent } from 'react';

interface FloatingInputProps {
    type: string,
    id?: string,
    htmlFor?: string,
    value?: any,
    labelText: string,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    required?: boolean;
    autoFocus?: boolean;
}

export const FloatingInput = ({ 
    type, 
    id = "floating-outlined-input",
    htmlFor,
    value, 
    labelText = "", 
    onChange, 
    placeholder = "",
    className = '', 
    disabled, 
    required, 
    autoFocus 
}: FloatingInputProps) => {
    const finalHtmlFor = htmlFor || id;

    return (
        <div className="relative">
            <input 
                type={type}
                id={id} 
                value={value}
                onChange={onChange} 
                placeholder={placeholder} 
                disabled={disabled} 
                required={required} 
                autoFocus={autoFocus} 
                className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 
                    bg-white rounded-lg border border-gray-300 appearance-none 
                    focus:outline-none focus:ring-0 focus:border-black peer 
                    disabled:bg-gray-100 disabled:cursor-not-allowed ${className}`} 
            />
            
            <label
                htmlFor={finalHtmlFor}
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 
                    scale-75 top-2 z-10 origin-[0] px-2 bg-white peer-focus:px-2 
                    peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
                    peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 
                    peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto 
                    start-1"
            >
                {labelText}
            </label>
        </div>
    );
}