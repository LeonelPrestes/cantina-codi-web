import { Outlet } from "react-router-dom";
import { Header } from "./components/header";

export function AppLayout() {
  return (
    <div className="min-h-screen px-4">
      <Header />
      <main className="mt-20">
        <Outlet />
      </main>
    </div>
  );
}
