export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  grid: string[][];
}

export interface AudioRecorderProps {
  onRecordingComplete: (blob: Blob) => void;
  isProcessing: boolean;
}

export interface Conversation {
  messages: Message[];
  addMessage: (message: Message) => void;
  reset: () => void;
}