import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { CartContextProvider } from "./context/cart-context";
import { queryClient } from "./lib/react-query";
import { router } from "./router/router";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartContextProvider>
        <RouterProvider router={router} />
        <Toaster duration={3000} richColors />
      </CartContextProvider>
    </QueryClientProvider>
  );
}
