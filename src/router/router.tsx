import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@/pages/app/_layout";
import { Home } from "@/pages/app/home";
import { ProductDetails } from "@/pages/app/product-details";
import { AuthLayout } from "@/pages/auth/_layout";
import { SignIn } from "@/pages/auth/sign-in";
import { SignUp } from "@/pages/auth/sign-up";
import { DashLayout } from "@/pages/dashboard/_layout";
import { Dashboard } from "@/pages/dashboard/dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/produto-detalhes/:id",
        element: <ProductDetails />,
      },
    ],
  },

  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/sign-in",
        element: <SignIn />,
      },
      {
        path: "/auth/sign-up",
        element: <SignUp />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <DashLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);
