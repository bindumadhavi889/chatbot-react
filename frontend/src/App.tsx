import { useState, useRef } from "react";
import ChatMessage from "./components/MsgContainer";
import ChatInput from "./components/Chat";
import RecorderButton from "./components/Recording";
import LanguageDropdown from "./components/Dropdown";

export type Message = {
  text?: string;
  audioUrl?: string;
  sender: "user" | "bot";
};

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const handlePlay = (audio: HTMLAudioElement) => {
    if (currentAudioRef.current && currentAudioRef.current !== audio) {
      currentAudioRef.current.pause();
    }
    currentAudioRef.current = audio;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-3xl h-[80vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              message={msg}
              onPlay={handlePlay}
            />
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t flex items-center gap-3">
          <LanguageDropdown
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
          />

          <ChatInput
              addMessage={addMessage}
              selectedLanguage={selectedLanguage}
            />

          <RecorderButton addMessage={addMessage} />
        </div>
      </div>
    </div>
  );
}

export default App;