import { useParams } from "react-router-dom";

export default function ProfilePage() {
    const { mention } = useParams();
    
    return <>{mention}</>
}