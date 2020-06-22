import { useEffect, useState } from 'react';
import Fetch from '../utils/Fetch';

export default function useUsers() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    const abortController = new AbortController();

    const fetchUsers = async () => {
      const init = { headers: abortController.signal }
      const fetchedUsers = await new Fetch('users', init).fetch();
      setUsers(fetchedUsers);
    }

    if (users && !users.length) fetchUsers();

    return () => abortController.abort();
  }, [users])

  return users;
}
