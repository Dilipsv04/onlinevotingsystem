import React from 'react';
import { Link } from 'react-router-dom';

const IndexPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Smarter Voting System
        </h1>
        
        <div className="space-y-6">
          <p className="text-center text-gray-600">Please choose an option:</p>
          
          <div className="flex flex-col space-y-4">
            <Link to="/register">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                Register
              </button>
            </Link>
            
            <Link to="/login">
              <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;