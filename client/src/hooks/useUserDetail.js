import UserApi from '../api/userApi';
import { useEffect, useState } from 'react';

export default function useProductDetail(id) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await UserApi.getUser(id);
        setUser(result);
      } catch (error) {
        console.log('Failed to fetch user', error);
      }

      setLoading(false);
    })();
  }, [id]);

  return { user, loading };
}
