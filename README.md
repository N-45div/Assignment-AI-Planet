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

## Code Architecture

### Frontend Architecture

#### Components Overview
- **App.jsx**: Root component that:
  - Manages global state (chat history, file selection, loading states)
  - Handles API communication with the backend
  - Coordinates between Header and ChatInterface components

- **Header.jsx**: 
  - Manages file upload UI
  - Handles PDF file selection
  - Provides upload status feedback
  - Implements file validation

- **ChatInterface.jsx**:
  - Renders chat messages
  - Manages message input
  - Handles message submission
  - Implements auto-scroll functionality
  - Provides real-time UI feedback

#### State Management
- Uses React's useState for local state management
- Implements prop drilling for component communication
- Manages loading states for async operations

#### API Integration
- Axios for HTTP requests
- FormData for file uploads
- Error handling and user feedback
- Request/response interceptors

### Backend Architecture

#### Core Components
- **FastAPI Application (main.py)**:
  - Handles HTTP requests
  - Manages routing and middleware
  - Implements CORS policies
  - Coordinates between services

- **Database Layer (models.py)**:
  - Defines SQLAlchemy models
  - Manages database sessions
  - Handles data persistence
  - Implements schema definitions

- **AI Service Integration**:
  - LangChain integration
  - Google Gemini AI implementation
  - Prompt template management
  - Response processing

#### Data Flow
1. **PDF Upload Process**:
   ```
   Client → File Upload → PDF Processing → Text Extraction → Database Storage
   ```

2. **Question-Answering Flow**:
   ```
   User Question → API → Database Lookup → AI Processing → Response Generation → Client
   ```

#### Security & Performance
- Input validation
- Error handling
- Async operations
- Connection pooling
- Resource cleanup

## Project Structure

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

## Live Demo

The application is deployed and can be accessed at: [https://assignment-ai-planet.vercel.app/](https://assignment-ai-planet.vercel.app/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
