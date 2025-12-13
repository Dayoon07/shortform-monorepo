import { useParams } from "react-router-dom"

export default function ProfilePostDetailPage() {
    const { mention, communityUuid } = useParams();
    console.log("mention: " + mention);
    console.log("communityUuid: " + communityUuid);
    return <></>
}