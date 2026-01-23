import { Outlet } from "react-router-dom";
import { TopMenu } from "../components/TopMenu";
import { SideMenu } from "../components/SideMenu";
import "./DashboardLayout.scss";

export default function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <TopMenu />

      <div className="dashboard-body">
        <SideMenu />
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}