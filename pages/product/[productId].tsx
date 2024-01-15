import { useRouter } from 'next/router'; 
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchProductDetails = async (productId) => {
  const response = await axios.get(`https://dummyjson.com/products/${productId}`);
  return response.data;
};

const ProductDetails = () => {
  const { query } = useRouter();
  const productId = query.productId as string; 

  const { data: product, isLoading, isError } = useQuery(['product', productId], () => fetchProductDetails(productId));

  const [selectedImage, setSelectedImage] = useState(product?.images[0] || ''); 

  useEffect(() => {
    setSelectedImage(product?.images[0] || '');
  }, [product]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching product details</div>;
  }

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  return (
    <>
      <div className="text-center">
      <h1 className="text-3xl p-4">Product Details</h1>
      <div className="flex gap-6">
        <div className="grid gap-4">
          {product?.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Product Image ${index + 1}`}
              className="w-16 h-16 cursor-pointer"
              onClick={() => handleImageClick(image)}
            />
          ))}
        </div>
        <div className="flex-none">
        <img
          src={selectedImage}  
          alt={product?.title}
          className="h-64 "
        />
      </div>
        <div className="flex-1 text-justify">
          <h1 className="text-2xl font-bold">{product?.title}</h1>
          <p>Brand: {product?.brand}</p>
          <p>Rating: {product?.rating}⭐</p>
          <p>Price: {product?.price}</p>
          <p>Stock: {product?.stock}</p>
          <p>Description: {product?.description}</p>
          <p>Discount: {product?.discountPercentage}</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductDetails;
