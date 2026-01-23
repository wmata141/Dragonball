import "./StatCard.scss";
import { useNavigate } from "react-router-dom";

type Props = {
    title: string;
    value: number;
    icon: React.ReactNode;
    to?: string;
};

export const StatCard = ({ title, value, icon, to }: Props) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (to) navigate(to);
    };

    return (
        <div className={`stat-card ${to ? "clickable" : ""}`}
            onClick={handleClick}
            role={to ? "button" : undefined}
            tabIndex={to ? 0 : -1}
            onKeyDown={(e) => {
                if (e.key === "Enter") handleClick();
            }}
        >
            <div className="stat-icon">{icon}</div>
            <div>
                <p className="stat-title">{title}</p>
                <h2 className="stat-value">{value}</h2>
            </div>
        </div>
    );
};