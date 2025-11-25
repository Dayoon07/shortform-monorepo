interface UploadProgressProps {
    progress: number,
    label: string
}

export default function UploadProgress({ progress, label }: UploadProgressProps) {
    return (
        <div className="w-full mt-4">
            <div className="flex justify-between items-center mb-2 text-xs md:text-sm">
                <span className="font-medium text-gray-700">{label}</span>
                <span className="text-gray-700">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                    className="bg-[#FE2C55] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}