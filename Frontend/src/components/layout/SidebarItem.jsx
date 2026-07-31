import { NavLink } from "react-router-dom";

function SidebarItem({ to, icon, label }) {
    return (
        <NavLink
            to={to}
            className={({isActive}) =>
                isActive
                ? "sidebar-link active"
                : "sidebar-link"
            }
        >
            {icon}
            <span>{label}</span>
        </NavLink>
    );
}

export default SidebarItem;