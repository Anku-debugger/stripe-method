import React, { useState } from 'react';
import Link from 'next/link';
import useProducts from '../hooks/useProducts';
import useCart from '../hooks/useCart';

const Products = () => {
  const { data: products, isLoading, isError } = useProducts();
  const { addToCart, cart } = useCart();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching products</div>;
  }

  return (
    <div>
      <center>
        <h1 className="text-3xl p-4">All Products</h1>
      </center>
      <div className="all-products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-8">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} addToCart={addToCart} cart={cart} />
        ))}
      </div>
    </div>
  );
};

const ProductItem = ({ product, addToCart, cart }) => {
  const [isItemAdded, setIsItemAdded] = useState(
    cart && cart.some((item) => item?.id === product?.id)
  );

  const handleAddToCart = async () => {
    const added = await addToCart(product);
    if (added) {
      setIsItemAdded(true);
    }
  };

  return (
    <div className="card-img border border-gray-400 text-center p-4 block">
      <Link href={`/product/${product.id}`} passHref>
        <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover mb-2" />
        <h3 className="m-0 text-lg font-semibold">{product.title}</h3>
      </Link>
      <p className="mb-2">Price: $ {product.price}</p>
      <button
        type="button"
        onClick={handleAddToCart}
        id={`cart-btn ${isItemAdded ? 'added' : ''}`}
        disabled={isItemAdded}
        className="cart-btn bg-gray-600 text-white rounded-md font-semibold text-lg px-6 py-2"
      >
        {isItemAdded ? 'Item Added' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default Products;
