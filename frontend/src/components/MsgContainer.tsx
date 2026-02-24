import type { Message } from "../App";

type Props = {
  message: Message;
  onPlay: (audio: HTMLAudioElement) => void;
};

function ChatMessage({ message, onPlay }: Props) {
  return (
    <div
      className={`p-3 rounded-xl max-w-xs ${
        message.sender === "user"
          ? "bg-indigo-500 text-white ml-auto"
          : "bg-gray-200 text-black"
      }`}
    >
      {message.text && <p>{message.text}</p>}

      {message.audioUrl && (
        <audio
          controls
          src={message.audioUrl}
          onPlay={(e) => onPlay(e.currentTarget)}
        />
      )}
    </div>
  );
}

export default ChatMessage;