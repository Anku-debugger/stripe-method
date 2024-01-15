import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useCart from '../hooks/useCart';

const navbar = () => {
  const { cart } = useCart();

  return (
    <div className="navbar flex items-center justify-between p-5 w-full bg-gray-300">
        <Link href="/" className="text-2xl" style={{color: "#ca8a04",fontWeight: "500",fontSize: "28px"}}>Home Page</Link>
        <Link href="/products" className="text-2xl" style={{color: "#ca8a04",fontWeight: "500",fontSize: "28px"}}>Products</Link> 
        <Link href="/cart" className="relative">
          <>
            <Image src="/images/cart.png" alt="cart" width={100} height={40} className="w-12" />
            {cart?.length === 0 ? ('') : ( 
              <span className="bg-yellow-600 text-white absolute flex" style={{height:"30px",alignItems: "center",width: "30px",justifyContent: "center",borderRadius: "50%",position: "absolute",bottom: "30px",right: "0px"}}>
              {cart?.length}
              </span>
            )}
          </>
        </Link>
  </div>
  )
}

export default navbar