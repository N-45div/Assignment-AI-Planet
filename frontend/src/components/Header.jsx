import React from 'react';
import { Upload } from 'lucide-react';

const Header = ({ setSelectedFile, handleFileUpload, loading }) => {
  return (
    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
          <span className="text-emerald-600 font-semibold">AI</span>
        </div>
        <h1 className="text-lg font-semibold text-gray-900">AI Assistant</h1>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          className="hidden"
          id="pdf-upload"
        />
        <label
          htmlFor="pdf-upload"
          className="cursor-pointer flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Upload size={18} />
          <span>Choose PDF</span>
        </label>
        <button
          onClick={handleFileUpload}
          disabled={loading}
          className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50"
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
    </div>
  );
};

export default Header;