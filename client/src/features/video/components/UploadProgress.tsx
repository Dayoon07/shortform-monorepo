interface UploadProgressProps {
	progress: number;
	label: string;
	color?: "blue" | "pink" | "green"; // 필요한 색 추가 가능
}

const COLOR_MAP: Record<NonNullable<UploadProgressProps["color"]>, string> = {
	blue: "bg-blue-500",
	pink: "bg-[#FE2C55]",
	green: "bg-green-500",
};

export default function UploadProgress({ progress, label, color = "blue" }: UploadProgressProps) {
	return (
		<div className="w-full mt-4">
			<div className="flex justify-between items-center mb-2 text-xs md:text-sm">
				<span className="font-medium text-gray-700">{label}</span>
				<span className="text-gray-700">{Math.round(progress)}%</span>
			</div>
			<div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
				<div
					className={`${COLOR_MAP[color]} h-2 transition-all duration-300`}
					style={{ width: `${progress}%` }}
				/>
			</div>
		</div>
	);
}
