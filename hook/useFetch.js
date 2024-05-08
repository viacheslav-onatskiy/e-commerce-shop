import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetch = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      // const response = await axios.get('http://localhost:5000/api/products/');
      const response = await axios.get('http://10.0.0.221:5000/api/products/');
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
