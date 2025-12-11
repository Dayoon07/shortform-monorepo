interface CustomInputProps {
    id?: string;
    type: string;
    value?: string | number | readonly string[] | any; 
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void | any;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    required?: boolean;
    autoFocus?: boolean;
}

export const CustomInput = ({
    id, 
    type = "text", // 기본값 설정
    value, 
    onChange, 
    placeholder, 
    className, 
    disabled, 
    required, 
    autoFocus
}: CustomInputProps) => {
    return (
        <input 
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={className}
            disabled={disabled}
            required={required}
            autoFocus={autoFocus}
        />
    );
}