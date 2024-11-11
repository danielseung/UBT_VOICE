import React from 'react';
import { Bot, User } from 'lucide-react';
import type { Message } from '../types';

export function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-4 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
        isUser ? 'bg-blue-500' : 'bg-gray-700'
      }`}>
        {isUser ? (
          <User className="w-6 h-6 text-white" />
        ) : (
          <Bot className="w-6 h-6 text-white" />
        )}
      </div>
      <div className={`flex-1 max-w-[80%] rounded-2xl px-4 py-2 ${
        isUser ? 'bg-blue-500 text-white' : 'bg-gray-100'
      }`}>
        <pre className="text-sm whitespace-pre-wrap font-sans">{message.content}</pre>
      </div>
    </div>
  );
}