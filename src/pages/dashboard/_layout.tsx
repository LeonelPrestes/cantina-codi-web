import { Outlet } from "react-router-dom";
import { Header } from "../app/components/header";

export function DashLayout() {
  return (
    <div className="min-h-screen px-4">
      <Header />
      <main className="mt-20">
        <Outlet />
      </main>
    </div>
  );
}
