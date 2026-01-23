import { useAuth } from "../auth/AuthContext";
import "./TopMenu.scss";

export const TopMenu = () => {
  const { user } = useAuth();

  return (
    <nav className="top-menu">
      <div className="menu-left">
        {/* Solo la barra, sin iconos ni botones */}
      </div>
      <div className="menu-right">
        {/* Aquí puedes poner branding, título o dejar vacío */}
        {user.email} {user.role === 'admin' ? 'ADMIN' : ''}
      </div>
    </nav>
  );
};