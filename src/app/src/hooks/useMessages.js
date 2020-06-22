import { useEffect, useState } from 'react';
import Fetch from '../utils/Fetch';

export default function useMessages() {
  const [messages, setMessages] = useState([])
  useEffect(() => {
    const abortController = new AbortController();

    const fetchMessages = async () => {
      const token = localStorage.getItem('auth-token');
      const init = { headers: abortController.signal }
      const messages = await new Fetch(`messages?token=${token}`, init).fetch();
      setMessages(messages);
    }

    if (messages && !messages.length) fetchMessages();

    return () => abortController.abort();
  }, [messages])

  return messages;
}
