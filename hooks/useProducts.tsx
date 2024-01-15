import { useQuery } from 'react-query';
import axios from 'axios';

const fetchProducts = async () => {
  const response = await axios.get('https://dummyjson.com/products');
  return response.data.products;
};

const useProducts = () => {
  return useQuery('products', fetchProducts);
};

export default useProducts;
