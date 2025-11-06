import { useParams } from "react-router-dom";
import { useUser } from "../../shared/context/UserContext";

export default function ProfilePostPage() {
    const { mention } = useParams();
    const { user } = useUser();

    console.log(mention);
    console.log(user);

    return (
        <>
            현재 세션에 로그인한 유저: {user.username}
        </>
    );
}