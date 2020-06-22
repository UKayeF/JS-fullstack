import { useEffect, useState } from 'react';
import Fetch from '../utils/Fetch';

export default function useContacts() {
  const [contacts, setContacts] = useState([])
  useEffect(() => {
    const abortController = new AbortController();

    const fetchContacts = async () => {
      const username = localStorage.getItem('username');
      const init = { headers: abortController.signal }
      const fetchedContacts = await new Fetch(`contacts?user=${username}`, init).fetch();
      setContacts(fetchedContacts);
    }

    if (contacts && !contacts.length) fetchContacts();

    return () => abortController.abort();
  }, [contacts])

  return contacts;
}
