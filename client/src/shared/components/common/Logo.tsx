import { Link } from "react-router-dom";
import { ROUTE } from "../../constants/Route";

export const Logo = ({ className }: { className?: string }) => (
    <h1 className={`bg-gradient-to-t from-pink-500 to-sky-500 bg-clip-text 
        text-transparent md:text-3xl text-2xl font-bold pl-2 ${className}`}>
        <Link to={ROUTE.HOMEPAGE}>FlipFlop</Link>
    </h1>
);