import { useState } from "react";
import type { Message } from "../App";

type Props = {
  addMessage: (message: Message) => void;
  selectedLanguage: string;
};

function ChatInput({ addMessage, selectedLanguage }: Props) {
  const [text, setText] = useState("");

  const sendMessage = async () => {
    if (!text.trim()) return;

    const userText = text;
    setText(""); // clear immediately

    addMessage({ text: userText, sender: "user" });

    try {
      const response = await fetch("http://localhost:8000/text-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: userText,
          language: selectedLanguage,
        }),
      });

      const data = await response.json();

      addMessage({
        text: data.reply_text,
        sender: "bot",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // prevent form submit or reload
      sendMessage();
    }
  };

  return (
    <div className="flex flex-1 gap-2">
      <input
        className="flex-1 border rounded-xl px-4 py-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
      />

      <button
        onClick={sendMessage}
        className="bg-indigo-600 text-white px-4 py-2 rounded-xl"
      >
        Send
      </button>
    </div>
  );
}

export default ChatInput;