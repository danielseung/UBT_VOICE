import { useState, useCallback } from 'react';
import type { Message, Conversation } from '../types';
import { CONFIG } from '../config';

export function useConversation(): Conversation {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'system', content: CONFIG.SYSTEM_PROMPT }
  ]);

  const addMessage = useCallback((message: Message) => {
    setMessages(prev => [...prev, message]);
  }, []);

  const reset = useCallback(() => {
    setMessages([{ role: 'system', content: CONFIG.SYSTEM_PROMPT }]);
  }, []);

  return { messages, addMessage, reset };
}