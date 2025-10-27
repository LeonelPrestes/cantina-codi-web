import { createContext, type ReactNode, useContext, useState } from "react";

type CartContextType = {
  addToCart: (items: CartItemProps) => void;
  decrementItemCart: (items: CartItemProps) => void;
  removeAllQuantityOfItem: (id: string) => void;
  cart: CartItemProps[];
  totalCart: number;
};

export const CartContext = createContext({} as CartContextType);

interface CartContextProps {
  children: ReactNode;
}

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export function CartContextProvider({ children }: CartContextProps) {
  const [cart, setCart] = useState<CartItemProps[]>([]);

  function addToCart(items: CartItemProps) {
    const itemExistToCart = cart.find((item) => item.id === items.id);

    if (itemExistToCart) {
      const updatedCart = cart.map((item) => {
        if (item.id === items.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        } else {
          return item;
        }
      });

      setCart(updatedCart);
    } else {
      const newItem = {
        ...items,
        quantity: 1,
      };

      setCart([...cart, newItem]);
    }
  }

  function decrementItemCart(product: CartItemProps) {
    const existItemToCart = cart.find((item) => item.id === product.id);

    if (existItemToCart?.quantity === 1) {
      const updateCart = cart.filter((item) => item.id !== product.id);
      setCart(updateCart);
    } else {
      const updateCart = cart.map((item) => {
        if (item.id === product.id) {
          return {
            ...product,
            quantity: product.quantity - 1,
          };
        }
        return item;
      });
      setCart(updateCart);
    }
  }

  function removeAllQuantityOfItem(id: string) {
    const updateCart = cart.filter((item) => {
      return item.id !== id;
    });
    setCart(updateCart);
  }

  const totalCart = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        decrementItemCart,
        removeAllQuantityOfItem,
        cart,
        totalCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
