import { useEffect, useState } from 'react';
import Fetch from '../utils/Fetch';

export default function useMessages(){
  const [messages, setMessages] = useState([])
  useEffect(() => {
    const abortController = new AbortController();

    const fetchMessages = async () => {
      const token = localStorage.getItem('auth-token');
      const messages = await new Fetch(`messages?token=${token}`).fetch();
      setMessages(messages);
    }

    if(messages && !messages.length) fetchMessages();

    return () => abortController.abort();
  }, [messages])

  return messages;
}
