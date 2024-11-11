import React, { useEffect, useRef } from 'react';
import type { Message } from '../types';

interface ChatMessagesProps {
  messages: Message[];
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="border border-white/20 rounded-lg p-4 mb-4 h-[60vh] overflow-y-auto">
      <div className="space-y-4">
        {messages.slice(1).map((message, index) => (
          <div
            key={index}
            className={`${
              message.role === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-4 rounded-lg max-w-[85%] ${
                message.role === 'user'
                  ? 'bg-white text-black'
                  : 'bg-gray-900 text-white border border-white/20'
              }`}
            >
              {message.role === 'assistant' ? (
                <pre className="whitespace-pre-wrap font-mono text-sm overflow-x-auto">
                  {(() => {
                    try {
                      const parsed = JSON.parse(message.content);
                      return JSON.stringify(parsed, null, 2);
                    } catch (e) {
                      return message.content;
                    }
                  })()}
                </pre>
              ) : (
                <div className="text-sm">{message.content}</div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}