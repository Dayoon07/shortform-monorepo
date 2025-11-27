import { Link } from "react-router-dom";
import "./NavItem.scss";
import { JSX } from "react";

interface NavItemProps {
    to: string,
    label: string,
    Icon: JSX.Element,
    stroke?: boolean,
    strokeWidth?: string,
    viewBox?: string
}

export default function NavItem({ 
    to, 
    label, 
    Icon, 
    stroke = false, 
    strokeWidth, 
    viewBox = "0 0 24 24"
}: NavItemProps) {
    return (
        <Link to={to} className="nav-item-link">
            <Icon />
            <span className="font-medium">{label}</span>
        </Link>
    );
}
