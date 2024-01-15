import React from 'react';
import Image from 'next/image';
import useCart from '../hooks/useCart';
import Link from 'next/link';

const Cart = () => {
  const { cart, isLoading, isError,totalPrice, removeFromCart, increment, decrement,clearCart } = useCart();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching cart data</div>;
  }

  return (
    <>
      {cart.length === 0 ? (
        <center>
            <h1 className="text-3xl p-4">Your cart is empty</h1>
        </center>
      ) : (  
            <>
            <center>
            <h1 className="text-3xl p-4">Shopping Cart</h1>
          </center>
          <table>
            <tbody>
              {cart.map((product) => (
                  <tr key={product?.id} style={{alignItems:"center"}}>
                      <td><img src={product?.thumbnail} alt={product?.title} className="w-40 mb-2" /></td>
                      <td><h2>{product?.title} </h2> </td>
                      <td><h2>{product?.brand}</h2></td>
                      <td><div className='quantity'>
                        <button type='button' onClick={()=>decrement(product?.id)} className='quantity-btn bg-gray-600 text-white font-semibold text-lg px-2 py-0'>-</button>
                        <input type='number' value={product?.quantity || 1} placeholder='0' className='w-20 text-center px-4' readOnly/>
                        <button type='button' onClick={()=>increment(product?.id)} className='quantity-btn bg-gray-600 text-white font-semibold text-lg px-2 py-0'>+</button>
                      </div></td>
                      <td><h2>Total Price: $ {product?.price}</h2> </td>
                      <td><button
                      className="cart-btn" 
                      onClick={() => removeFromCart(product?.id)}>
                      <Image src="/images/delete.png" width={100} height={40} alt='delete' className='w-10'/>
                      </button></td>
                  </tr>
              ))}
            </tbody>
          </table>
          <div className='flex' style={{ justifyContent: "space-between",padding:"10px 65px",background: "#d1d5db",zIndex:"9999",position: "fixed",bottom: "0",width: "100%"}}>
            <h2 className='text-2xl'>Total Price: $ {totalPrice.toFixed(2)}</h2> 
            <div className='flex gap-5'>
              <button onClick={clearCart} className='bg-gray-600 text-white rounded-md font-semibold text-lg px-6 py-2'><Link href="/products">Clear Cart</Link> </button>
              <button className='bg-yellow-600 text-white rounded-md font-semibold text-lg px-6 py-2'><Link href="/PaymentForm">Checkout </Link></button>
            </div>
          </div>
          </>
      )}
    </>
  );
};

export default Cart;
