import VideoList from "../../widgets/video/VideoList";
import { useDocTitle } from "../../shared/hooks/useDocTitle";

export default function HomePage() {
    useDocTitle("FlipFlop");
    return <VideoList />
}