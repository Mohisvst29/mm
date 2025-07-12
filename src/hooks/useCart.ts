import { useState } from 'react';
import { CartItem, MenuItem } from '../types/menu';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [tableNumber, setTableNumber] = useState<string>('');

  const addToCart = (item: MenuItem | any, selectedSize?: string, selectedPrice?: number) => {
    const cartItem: CartItem = {
      ...item,
      id: item.id.toString(),
      quantity: 1,
      selectedSize,
      selectedPrice: selectedPrice || item.price
    };

    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        cartItem => cartItem.id.toString() === item.id.toString() && cartItem.selectedSize === selectedSize
      );

      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id.toString() === item.id.toString() && cartItem.selectedSize === selectedSize
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...prevItems, cartItem];
    });
  };

  const removeFromCart = (id: string, selectedSize?: string) => {
    setCartItems(prevItems =>
      prevItems.filter(item => !(item.id.toString() === id.toString() && item.selectedSize === selectedSize))
    );
  };

  const updateQuantity = (id: string, quantity: number, selectedSize?: string) => {
    if (quantity <= 0) {
      removeFromCart(id, selectedSize);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id.toString() === id.toString() && item.selectedSize === selectedSize
          ? { ...item, quantity }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.selectedPrice || item.price) * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    tableNumber,
    setTableNumber,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    clearCart
  };
};