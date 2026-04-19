import { TagVideo } from "../../features/video/components/TagVideo";

export default function TagVideoList({ hashtag }: { hashtag?: string }) {
    return <TagVideo hashtag={hashtag} />
}