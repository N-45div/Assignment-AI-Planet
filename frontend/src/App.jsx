import React, { useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import ChatInterface from './components/ChatInterface';

function App() {
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [docId, setDocId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async () => {
    if (!selectedFile) return alert('Please select a PDF file to upload.');

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8000/upload_pdf/', formData);
      setDocId(response.data.doc_id);
      alert('PDF uploaded successfully!');
    } catch (error) {
      console.error('File upload error:', error);
      alert('Failed to upload PDF.');
    } finally {
      setLoading(false);
    }
  };

  const handleAskQuestion = async () => {
    if (!docId) return alert('Please upload a PDF first.');
    if (!question) return alert('Please enter a question.');

    const newQuestion = { type: 'question', content: question };
    setChatHistory((prevHistory) => [...prevHistory, newQuestion]);

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8000/ask_question/', {
        doc_id: docId,
        question: question,
      });

      const answer = response.data.answer || 'No answer available.';
      const newAnswer = { type: 'answer', content: answer };
      setChatHistory((prevHistory) => [...prevHistory, newAnswer]);
    } catch (error) {
      console.error('Question asking error:', error);
      alert('Failed to get an answer.');
    } finally {
      setLoading(false);
      setQuestion('');
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header setSelectedFile={setSelectedFile} handleFileUpload={handleFileUpload} loading={loading} />
      <ChatInterface
        chatHistory={chatHistory}
        handleAskQuestion={handleAskQuestion}
        question={question}
        setQuestion={setQuestion}
      />
    </div>
  );
}

export default App;
