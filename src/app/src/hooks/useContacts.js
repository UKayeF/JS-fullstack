import { useEffect, useState } from 'react';
import Fetch from '../utils/Fetch';

export default function useContacts() {
  const [contacts, setContacts] = useState([])
  useEffect(() => {
    const abortController = new AbortController();

    const fetchContacts = async () => {
      const username = localStorage.getItem('username');
      const init = { headers: abortController.signal }
      const messages = await new Fetch(`contacts?user=${username}`, init).fetch();
      setContacts(messages);
    }

    if (contacts && !contacts.length) fetchContacts();

    return () => abortController.abort();
  }, [contacts])

  return contacts;
}
