import React, { useRef, useState } from 'react';
import { Mic, Square } from 'lucide-react';
import { transcribeAudio } from '../services/openai';

interface VoiceRecorderProps {
  isLoading: boolean;
  onTranscription: (text: string) => Promise<void>;
}

export function VoiceRecorder({ isLoading, onTranscription }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm'
      });
      
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        try {
          const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
          if (audioBlob.size > 0) {
            const transcription = await transcribeAudio(audioBlob);
            await onTranscription(transcription);
          }
        } catch (error) {
          console.error('Error processing audio:', error);
        } finally {
          stream.getTracks().forEach(track => track.stop());
        }
      };

      mediaRecorder.start(100); // Start recording with 100ms timeslices
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Unable to access microphone. Please ensure you have granted permission.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        disabled={isLoading}
        className={`p-3 rounded-full ${
          isRecording
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-white hover:bg-gray-200'
        } text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
        aria-label={isRecording ? 'Stop recording' : 'Start recording'}
      >
        {isRecording ? <Square size={24} /> : <Mic size={24} />}
      </button>
      <span className="text-sm text-white/60">
        {isLoading ? 'Processing...' : isRecording ? 'Recording... Click to stop' : 'Click to record'}
      </span>
    </div>
  );
}