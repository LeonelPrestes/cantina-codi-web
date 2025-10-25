import { Outlet } from "react-router-dom";

export function DashLayout() {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
