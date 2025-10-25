import { Outlet } from "react-router-dom";
import { Header } from "./components/header";

export function AppLayout() {
  return (
    <div className="min-h-screen p-4">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
