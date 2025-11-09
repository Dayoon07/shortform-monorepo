export default function UploadProgress({ progress, label, color = 'blue' }) {
    const colorClasses = {
        blue: 'bg-blue-500',
        pink: 'bg-[#FE2C55]'
    };

    return (
        <div className="w-full mt-4">
            <div className="flex justify-between items-center mb-2 text-xs md:text-sm">
                <span className="font-medium text-gray-700">{label}</span>
                <span className="text-gray-700">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                    className={`${colorClasses[color]} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}