///// hooks/useCart.tsx /////
import { useQuery, useMutation, useQueryClient } from 'react-query';

const fetchCart = async () => {

  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    return JSON.parse(storedCart);
  }
  return [];
};

const updateCart = async (newCart) => {
  localStorage.setItem('cart', JSON.stringify(newCart));
};

const clearCart = async () => {
  localStorage.removeItem('cart');
};

const useCart = () => {

  const queryClient = useQueryClient();

  const { data: cart, isLoading, isError } = useQuery('cart', fetchCart);

  const mutation = useMutation(updateCart, {
    onSuccess: () => {
      queryClient.invalidateQueries('cart');
    },
  });

  const addToCart = async (product) => {
    console.log("newCart is: ",product?.id)
    
    const newCart = [...(cart || []), product];
    await mutation.mutateAsync(newCart); 
    return true;
  };

  const removeFromCart = async (productId) => {
    const newCart = (cart || []).filter((product) => product?.id !== productId);
    await mutation.mutateAsync(newCart);
  };

  const increment = async (productId) => {
    const updatedCart = (cart || []).map((item) =>
      item?.id === productId ? { ...item, quantity: (item?.quantity || 1) + 1 } : item
    );
    await mutation.mutateAsync(updatedCart);
  };

  const decrement = async (productId) => {
    const updatedCart = (cart || []).map((item) =>
      item?.id === productId && item?.quantity > 1 ? { ...item, quantity: item?.quantity - 1 } : item
    );
    await mutation.mutateAsync(updatedCart);
  };

  const totalPrice = cart?.reduce((total, product) => {
    return total + (product?.price || 0) * (product?.quantity || 1);
  }, 0);

  return {
    cart,
    isLoading,
    isError,
    totalPrice,
    addToCart,
    removeFromCart,
    increment,
    decrement,
    clearCart,
  };
};

export default useCart;