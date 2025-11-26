import { Link } from "react-router-dom";
import "./NavItem.scss";

export default function NavItem({ to, label, icon: Icon, stroke = false, strokeWidth, viewBox = "0 0 24 24" }) {
    return (
        <Link to={to} className="nav-item-link">
            <Icon />
            <span className="font-medium">{label}</span>
        </Link>
    );
}
