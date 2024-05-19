import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useEffect, useState } from 'react';

const fetchCart = async (productId, quantity) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    const token = AsyncStorage.getItem('token');
    try {
      const endpoint = 'http://10.0.0.221:5000/api/cart/find';

      const headers = {
        'Content-Type': 'application/json',
        token: `Bearer ${JSON.parse(token)}`,
      };

      const response = await axios.get(endpoint, { headers });
      const newData = JSON.stringify(response.data);

      const parsedData = JSON.parse(newData);
      const products = parsedData[0].parsedData;

      await AsyncStorage.setItem('cartCount', JSON.stringify(products.length));
      setData(products);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetchCartData = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, loader: isLoading, error, refetchCartData };
};

export default fetchCart;
