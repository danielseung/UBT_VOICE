import OpenAI from 'openai';
import { CONFIG } from '../config';
import type { Message } from '../types';

export const openai = new OpenAI({
  apiKey: CONFIG.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('file', audioBlob, 'audio.webm');
    formData.append('model', CONFIG.WHISPER_MODEL);

    const transcriptionResponse = await openai.audio.transcriptions.create({
      file: new File([audioBlob], 'audio.webm', { type: 'audio/webm' }),
      model: CONFIG.WHISPER_MODEL,
    });

    console.log('Transcription:', transcriptionResponse.text);
    return transcriptionResponse.text;
  } catch (error) {
    console.error('Transcription error:', error);
    throw error;
  }
}

export async function getChatResponse(messages: Message[]): Promise<string> {
  const completion = await openai.chat.completions.create({
    messages,
    model: CONFIG.OPENAI_MODEL,
    temperature: 0.7,
    max_tokens: 500,
    frequency_penalty: 0.5,
    presence_penalty: 0.3,
  });
  return completion.choices[0].message.content || 'Sorry, I could not generate a response.';
}