import React from 'react';
import { Upload } from 'lucide-react';
 {/* This is header UI which handles the upload file part of the application*/} 
const Header = ({ setSelectedFile, handleFileUpload, loading, logo }) => {
  return (
    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white">
      <div className="flex items-center">
        {logo && (
          <img src={logo} alt="Logo" className="w-17 h-10 rounded-full" />
        )}
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
