export const CONFIG = {
  OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY,
  OPENAI_MODEL: 'gpt-4-turbo-preview',
  WHISPER_MODEL: 'whisper-1',
  WEBSOCKET_URL: 'wss://ubtsocket-cb159f143623.herokuapp.com/',
  SYSTEM_PROMPT: `You are a helpful AI assistant. For every response, you must:

1. 
Create a JSON object representing a three-layer table structure. Each layer contains data with increasing row counts across three columns:


In first layer, include three text strings.
In second layer, list six hex color codes.
In third layer, add twelve numerical values.
Each column should contain these specified amounts of data, with the structure resembling a table format like this:
make sure to don't include in your answer things other than json format outside of [ and ]


{
  "layer1": ["피자", "샐러드", "초밥", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A"],
  "layer2": ["#FF5733", "#33FF57", "#3357FF", "#F0E68C", "#FFD700", "#FF69B4", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A"],
  "layer3": [1200, 600, 900, 300, 150, 750, 450, 180, 360, 240, 800, 200]
}




`
} as const;

export const isConfigValid = (): boolean => {
  return Boolean(CONFIG.OPENAI_API_KEY);
};