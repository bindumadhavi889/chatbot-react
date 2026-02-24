import { useState, useRef } from "react";
import type { Message } from "../App";

type Props = {
  addMessage: (message: Message) => void;
};

function RecorderButton({ addMessage }: Props) {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorderRef.current = mediaRecorder;
    audioChunks.current = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.current.push(event.data);
    };

    mediaRecorder.onstop = handleStop;

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  const handleStop = async () => {
    const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });

    // ✅ Create local preview URL for user audio
    const localAudioUrl = URL.createObjectURL(audioBlob);

    // ✅ Add USER audio message to chat
    addMessage({
      audioUrl: localAudioUrl,
      sender: "user",
    });

    // Send to backend
    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.webm");

    try {
      const response = await fetch("http://localhost:8000/voice-chat", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      const botAudioUrl = `http://localhost:8000/audio/${data.audio_file}`;

      // ✅ Add BOT audio message (NO AUTOPLAY)
      addMessage({
        audioUrl: botAudioUrl,
        sender: "bot",
      });

    } catch (error) {
      console.error("Voice error:", error);
    }
  };

  return (
    <button
      onClick={recording ? stopRecording : startRecording}
      className={`px-4 py-2 rounded-xl text-white ${
        recording ? "bg-red-500" : "bg-green-500"
      }`}
    >
      {recording ? "Stop" : "Record"}
    </button>
  );
}

export default RecorderButton;