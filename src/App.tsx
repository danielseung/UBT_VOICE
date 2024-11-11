import React, { useState, useEffect } from 'react';
import { VoiceRecorder } from './components/VoiceRecorder';
import { ChatMessages } from './components/ChatMessages';
import { ChatInput } from './components/ChatInput';
import { getChatResponse } from './services/openai';
import { WebSocketService } from './services/websocket';
import { CONFIG } from './config';
import type { Message } from './types';

const wsService = new WebSocketService(CONFIG.WEBSOCKET_URL);

function App() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'system', content: CONFIG.SYSTEM_PROMPT }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    wsService.connect();
    return () => wsService.disconnect();
  }, []);

  const handleUserInput = async (input: string) => {
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { role: 'user', content: input }
    ];
    setMessages(newMessages);
    setInputText('');

    try {
      setIsLoading(true);
      const response = await getChatResponse(newMessages);
      const newMessage = { role: 'assistant' as const, content: response };
      setMessages([...newMessages, newMessage]);
      
      // Send the assistant's response to WebSocket
      wsService.sendMessage(response);
    } catch (error) {
      console.error('Error getting response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUserInput(inputText);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto max-w-4xl p-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Ultimate Bliss Technology AI</h1>
          <VoiceRecorder
            isLoading={isLoading}
            onTranscription={handleUserInput}
          />
        </div>
        
        <ChatMessages messages={messages} />
        
        <ChatInput
          inputText={inputText}
          isLoading={isLoading}
          onInputChange={setInputText}
          onSubmit={handleSubmit}
        />

        {isLoading && (
          <div className="text-center mt-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;