interface ValidationMessageFuncProps {
    message: string,
    color: string
}

export function ValidationMessage({ message, color }: ValidationMessageFuncProps) {
    if (!message) return null;
    return <div className="mt-1 text-sm" style={{ color }}>{message}</div>
}