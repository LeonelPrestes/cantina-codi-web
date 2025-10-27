import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@/pages/app/_layout";
import { Cart } from "@/pages/app/cart";
import { Checkout } from "@/pages/app/checkout";
import { Home } from "@/pages/app/home";
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
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
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
