import { useEffect, useRef, memo } from "react";
import { Link } from "react-router-dom";

// ---------------------
// Hover & Lazy Play Hook
// ---------------------
function useLazyHoverVideo(videos) {
  const videoRefs = useRef([]);

  useEffect(() => {
    if (!videos.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const video = entry.target;

            // Lazy load
            if (video.dataset.src && !video.src) {
              video.src = video.dataset.src;
              video.load();
            }

            const card = video.closest(".video-card");
            if (card && !card.dataset.listenerAttached) {
              card.dataset.listenerAttached = "true";

              card.addEventListener("mouseover", () => {
                video.currentTime = 0;
                video.play().catch(() => {});
              });
              card.addEventListener("mouseout", () => {
                video.pause();
                video.currentTime = 0;
              });
              video.addEventListener("click", (e) => {
                e.preventDefault();
                video.paused ? video.play() : video.pause();
              });
            }

            observer.unobserve(video);
          }
        });
      },
      { rootMargin: "100px", threshold: 0.1 }
    );

    videoRefs.current.forEach((v) => v && observer.observe(v));

    return () => observer.disconnect();
  }, [videos]);

  return videoRefs;
}

// ---------------------
// Video Card Component
// ---------------------
const VideoCard = memo(({ video, index, videoRefs }) => {
  return (
    <div>
      <Link
        to={`/@${video.uploaderUsername}/swipe/video/${video.videoLoc}`}
        className="relative group cursor-pointer video-card"
      >
        <div className="relative aspect-[9/16] bg-gray-900 rounded-lg overflow-hidden">
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            data-src={video.videoSrc}
            playsInline
            preload="none"
            className="lazy-video w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

          <div className="absolute bottom-2 left-2 flex items-center space-x-1 bg-black/60 rounded-full px-2 py-1 backdrop-blur-sm">
            <svg
              className="w-3 h-3 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span className="text-white text-xs font-medium">{video.likeCount}</span>
          </div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      </Link>

      <div className="mt-2 px-1">
        <Link
          to={`/@${video.mention}`}
          className="block flex items-center space-x-2 mb-1"
        >
          <img
            src={video.profileImgSrc}
            className="w-8 h-8 rounded-full object-cover"
            alt="프로필"
          />
          <span className="text-white text-md font-semibold truncate">
            {video.uploaderUsername}
          </span>
        </Link>

        <p className="text-gray-300 text-md leading-tight line-clamp-2 mb-1 break-words whitespace-pre-wrap">
          {video.videoTitle.length > 25
            ? video.videoTitle.substring(0, 25) + "..."
            : video.videoTitle}
        </p>

        <span className="text-gray-400 text-sm">
          조회수 {video.videoViews.toLocaleString()}
        </span>
      </div>
    </div>
  );
});

// ---------------------
// Video Grid Component
// ---------------------
export default function VideoGrid({ videos }) {
  const videoRefs = useLazyHoverVideo(videos);

  return (
    <div className="md:max-w-5xl md:mx-auto grid md:min-[480px] grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 max-md:pb-[200px]">
      {videos.slice(0, 100).map((v, i) => (
        <VideoCard key={v.videoLoc || i} video={v} index={i} videoRefs={videoRefs} />
      ))}
    </div>
  );
}
