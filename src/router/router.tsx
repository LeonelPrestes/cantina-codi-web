import { createBrowserRouter, redirect } from "react-router-dom";
import { AppLayout } from "@/pages/app/_layout";
import { Home } from "@/pages/app/home";
import { CreateProduct } from "@/pages/dashboard/create-product";
import { DashLayout } from "@/pages/dashboard/_layout";
import { Dashboard } from "@/pages/dashboard/dashboard";
import { UpdateProducts } from "@/pages/dashboard/update-products";
import { Cart } from "@/pages/app/cart";
import { Checkout } from "@/pages/app/checkout";
import { AuthLayout } from "@/pages/auth/_layout";
import { SignIn } from "@/pages/auth/sign-in";
import { getProfile } from "@/api/get-profile";
// import { SignUp } from "@/pages/auth/sign-up";

async function requireAuthLoader() {
  try {
    const { user } = await getProfile();

    if (!user) {
      throw new Error("Nao autenticado");
    }

    return null;
  } catch {
    return redirect("/auth/sign-in");
  }
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        hydrateFallbackElement: <div>Carregando...</div>
      },
      {
        path: "/cart",
        element: <Cart />,
        hydrateFallbackElement: <div>Carregando...</div>
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
      // {
      //   path: "/auth/sign-up",
      //   element: <SignUp />,
      // },
    ],
  },

  {
    path: "/dashboard",
    element: <DashLayout />,
    loader: requireAuthLoader,
    hydrateFallbackElement: <div>Carregando...</div>,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/create-product",
        element: <CreateProduct />,
      },
      {
        path: "/dashboard/update-product/:productId",
        element: <UpdateProducts />,
      },
    ],
  },
]);
