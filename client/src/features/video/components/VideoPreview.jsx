export default function VideoPreview({ videoUrl, fileName, fileSize }) {
    const formatFileSize = (bytes) => {
        return (bytes / (1024 * 1024)).toFixed(1);
    };

    return (
        <div className="mt-4">
            <video 
                src={videoUrl}
                className="w-full max-w-md mx-auto rounded-lg mb-4" 
                controls
            />
            <p className="text-xs md:text-sm text-gray-600 mb-4 text-center">
                {fileName} ({formatFileSize(fileSize)}MB)
            </p>
        </div>
    );
}
