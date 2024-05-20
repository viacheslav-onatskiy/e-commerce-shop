import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetchCart = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem('token');

    try {
      const endpoint = 'http://10.0.0.221:5000/api/cart/find';

      const headers = {
        'Content-Type': 'application/json',
        token: `Bearer ${JSON.parse(token)}`,
      };

      const response = await axios.get(endpoint, { headers });
      const cartProducts = response.data[0]?.products || [];

      setData(cartProducts);
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
    fetchData();
  };

  console.log('data:', data.length);
  return { data, isLoading, error, refetchCartData };
};

export default useFetchCart;
