import { NavLink } from "react-router-dom";
import { Home, User, Globe, LogOut } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import "./SideMenu.scss";

export const SideMenu = () => {
    const { logout } = useAuth();

    return (
        <aside className="side-menu">
            <nav className="side-menu-nav">
                <NavLink to="/">
                    <span>DragonBall Dashboard</span>
                </NavLink>

                <NavLink to="/dashboard">
                    <Home size={20} />
                    <span>Inicio</span>
                </NavLink>

                <NavLink to="/characters">
                    <User size={20} />
                    <span>Personajes</span>
                </NavLink>

                <NavLink to="/planets">
                    <Globe size={20} />
                    <span>Planetas</span>
                </NavLink>
            </nav>
            {/* Botón de cierre de sesión */}
            <button className="side-menu-logout" onClick={logout}>
                <LogOut size={20} />
                <span>Salir</span>
            </button>
        </aside>
    );
};
