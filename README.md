# Assignment - (AI Planet)

A modern web application that allows users to upload PDF documents and interact with their content using AI-powered chat functionality. Built with React, FastAPI, and Google's Gemini AI.

## Features

- 📄 PDF document upload and processing
- 💬 Interactive chat interface
- 🤖 AI-powered question answering
- 📱 Responsive design
- 🔄 Real-time chat updates
- 💾 Database persistence

## Tech Stack

### Frontend
- React
- Tailwind CSS
- Axios
- Lucide Icons

### Backend
- FastAPI
- SQLAlchemy
- LangChain
- Google Gemini AI
- PyMuPDF (fitz)

## Architecture

The project follows a client-server architecture:

```
├── Frontend (React)
│   ├── Components
│   │   ├── Header (File upload)
│   │   └── ChatInterface (Chat UI)
│   └── App (State management)
│
└── Backend (FastAPI)
    ├── PDF Processing
    ├── Database (SQLAlchemy)
    └── AI Service (LangChain + Gemini)
```

## Prerequisites

- Node.js (v18 or higher)
- Python (v3.8 or higher)
- Google API Key for Gemini AI

## Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   ```

2. **Frontend Setup**
   ```bash
   # Install dependencies
   npm install

   # Start development server
   npm run dev
   ```

3. **Backend Setup**
   ```bash
   # Create virtual environment
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate

   # Install dependencies
   pip install -r requirements.txt

   # Set up environment variables
   cp .env.example .env
   # Edit .env with your Google API key and database URL
   ```

4. **Environment Variables**
   ```env
   GOOGLE_API_KEY=your_google_api_key
   DATABASE_URL= postgresql...
   ```

## Running the Application

1. **Start the Backend**
   ```bash
   uvicorn main:app --reload
   ```

2. **Start the Frontend**
   ```bash
   npm run dev
   ```

3. Access the application at `http://localhost:5173`

## API Endpoints

- `POST /upload_pdf/`: Upload PDF document
- `POST /ask_question/`: Ask questions about the PDF

## Component Structure

### Frontend Components

- **App.jsx**: Main component managing state and API interactions
- **Header.jsx**: Handles file upload functionality
- **ChatInterface.jsx**: Manages chat display and user input

### Backend Components

- **main.py**: FastAPI application and endpoints
- **models.py**: Database models and configuration

## Database Schema

```sql
CREATE TABLE pdf_documents (
    id VARCHAR PRIMARY KEY,
    title VARCHAR INDEX,
    content TEXT
);
```

## Live Demo

The application is deployed and can be accessed at: [https://assignment-ai-planet.vercel.app/](https://assignment-ai-planet.vercel.app/)


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
