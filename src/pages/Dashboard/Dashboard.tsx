import { User, Globe } from "lucide-react";
import { useDashboardMetrics } from "../../hooks/useDashboardMetrics";
import { StatCard } from "../../components/StatCard";
import { StatCardSkeleton } from "../../components/StatCardSkeleton";
import "./Dashboard.scss";

const Dashboard = () => {
  const { metrics, loading, error } = useDashboardMetrics();  

  return (
    <>
      <div className="stats-grid">
        {loading && (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        )}

        {!loading && metrics && (
          <>
            <StatCard
              title="Personajes"
              value={metrics.characters}
              icon={<User size={22} />}
              to="/characters"
            />
            <StatCard
              title="Planetas"
              value={metrics.planets}
              icon={<Globe size={22} />}
              to="/planets"
            />
          </>
        )}
      </div>

      {error && <p className="error">{error}</p>}
    </>
  );
};

export default Dashboard;