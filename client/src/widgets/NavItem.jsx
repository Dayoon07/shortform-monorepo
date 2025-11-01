import { Link } from "react-router-dom";

export default function NavItem({ to, label, icon, stroke = false, strokeWidth, viewBox = "0 0 24 24" }) {
  return (
    <Link 
      to={to} 
      className="nav-btn flex items-center space-x-3 p-3 hover:bg-gray-800/50 rounded-xl transition-colors group"
    >
      <svg 
        className="w-6 h-6 text-gray-400 group-hover:text-white" 
        fill={stroke ? "none" : "currentColor"}
        stroke={stroke ? "currentColor" : undefined}
        strokeWidth={strokeWidth}
        viewBox={viewBox}
      >
        {icon}
      </svg>
      <span className="font-medium">{label}</span>
    </Link>
  );
}