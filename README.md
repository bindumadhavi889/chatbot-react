🤖 React AI Chatbot

A simple AI-powered chatbot web application built using React for the frontend and FastAPI for the backend.
The chatbot allows users to send text or voice input and receive intelligent responses along with optional audio output.

This project demonstrates how modern conversational interfaces can be built by integrating frontend UI, backend APIs, and AI models.

🚀 Features

💬 Real-time chatbot conversation interface

🎤 Voice input support

🔊 Optional audio output playback

🌍 Language selection for responses

⚡ Fast API communication between frontend and backend

🧩 Modular React component structure

📱 Clean and responsive chat UI

🏗️ Tech Stack
Frontend

React

TypeScript / JavaScript

HTML5 & CSS3

Backend

FastAPI

Python

AI / Processing

LLM API for generating responses

Speech processing for voice input/output

📂 Project Structure


chatbot-react
│
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── MsgContainer.jsx
│   │   │   ├── Chat.jsx
│   │   │   ├── Recording.jsx
│   │   │   └── Dropdown.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── backend
│   ├── main.py
│   └── requirements.txt
│
└── README.md


⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/bindumadhavi889/chatbot-react.git
cd chatbot-react
▶️ Running the Backend

Navigate to backend folder

cd backend

Create virtual environment

python -m venv venv

Activate environment

Windows

venv\Scripts\activate

Install dependencies

pip install -r requirements.txt

Run the FastAPI server

uvicorn main:app --reload

Backend will run on:

http://127.0.0.1:8000
▶️ Running the Frontend

Open a new terminal.

cd frontend
npm install
npm start

Frontend will run on:

http://localhost:3000
💡 How It Works

User sends a message or voice input from the React interface.

The message is sent to the FastAPI backend through an API request.

The backend processes the request and sends it to an AI model or processing module.

The generated response is returned to the frontend.

The chatbot displays the response and optionally plays audio.

📸 Demo

Example chat interface:

User: Hello
Bot: Hi! How can I help you today?

Voice input and audio responses are also supported.

📌 Future Improvements

Conversation history storage

Authentication system

Multi-language support

Better UI animations

Deploy on cloud (AWS / Vercel / Render)

👩‍💻 Author

Bindumadhavi Penigandla
