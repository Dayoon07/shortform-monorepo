export default function ValidationMessage({ message, color }) {
    if (!message) return null;

    return (
        <div className="mt-1 text-sm" style={{ color }}>
            {message}
        </div>
    );
}