import React from 'react';
import { AlertTriangle } from 'lucide-react';

export function ConfigError() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="border border-white/20 rounded-xl p-6 max-w-md w-full">
        <div className="flex items-center justify-center mb-4">
          <AlertTriangle className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-xl font-bold text-center mb-2 text-white">Configuration Required</h1>
        <p className="text-gray-400 text-center mb-4">
          Please provide your OpenAI API key in the <code className="bg-gray-900 px-2 py-1 rounded">env</code> file:
        </p>
        <div className="bg-gray-900 p-4 rounded-lg mb-4 text-white">
          <code className="text-sm">VITE_OPENAI_API_KEY=your_api_key_here</code>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="w-full bg-white text-black hover:bg-gray-200 font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
}