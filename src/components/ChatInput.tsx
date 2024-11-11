import React from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  inputText: string;
  isLoading: boolean;
  onInputChange: (text: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ChatInput({ 
  inputText, 
  isLoading, 
  onInputChange, 
  onSubmit 
}: ChatInputProps) {
  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        type="text"
        value={inputText}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 p-3 rounded-lg bg-gray-900 text-white border border-white/20 focus:outline-none focus:border-white"
        disabled={isLoading}
      />
      <button
        type="submit"
        className="p-3 rounded-full bg-white text-black hover:bg-gray-200 disabled:opacity-50 disabled:hover:bg-white"
        disabled={isLoading || !inputText.trim()}
      >
        <Send size={24} />
      </button>
    </form>
  );
}