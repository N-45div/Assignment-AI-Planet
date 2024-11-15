import React, { useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

const ChatInterface = ({ chatHistory, handleAskQuestion, question, setQuestion }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAskQuestion();
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === 'question' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`
                max-w-[80%] rounded-2xl px-4 py-3 
                ${message.type === 'question'
                  ? 'bg-emerald-500 text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-900 rounded-bl-none'
                }
              `}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-end space-x-2">
          <div className="flex-1 relative">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              className="w-full resize-none rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent pr-12"
              style={{ maxHeight: '120px', minHeight: '50px' }}
              rows={1}
            />
            <button
              onClick={handleAskQuestion}
              className="absolute right-3 bottom-2.5 text-emerald-500 hover:text-emerald-600 transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
        <p className="mt-2 text-xs text-gray-500 text-center">
          Press Enter to send, Shift + Enter for new line
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;