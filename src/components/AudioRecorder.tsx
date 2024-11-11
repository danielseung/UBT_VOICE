import React, { useState, useRef } from 'react';
import { Mic, Square, Loader2 } from 'lucide-react';
import type { AudioRecorderProps } from '../types';

export function AudioRecorder({ onRecordingComplete, isProcessing }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        onRecordingComplete(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please ensure you have granted permission.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {isProcessing ? (
        <button
          disabled
          className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 text-gray-500"
        >
          <Loader2 className="w-6 h-6 animate-spin" />
        </button>
      ) : isRecording ? (
        <button
          onClick={stopRecording}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors"
        >
          <Square className="w-6 h-6" />
        </button>
      ) : (
        <button
          onClick={startRecording}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
        >
          <Mic className="w-6 h-6" />
        </button>
      )}
      <span className="text-sm text-gray-500">
        {isProcessing
          ? 'Processing...'
          : isRecording
          ? 'Recording... Click to stop'
          : 'Click to start recording'}
      </span>
    </div>
  );
}