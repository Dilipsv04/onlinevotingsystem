import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const states = [
    'andhra-pradesh', 'bihar', 'gujarat', 'maharashtra', 'delhi', 'uttar-pradesh', 'west-bengal',
    'rajasthan', 'tamil-nadu', 'kerala', 'karnataka', 'telangana', 'madhya-pradesh', 'odisha',
    'haryana', 'punjab', 'jammu-and-kashmir', 'assam', 'chhattisgarh', 'jharkhand', 'uttarakhand',
    'himachal-pradesh', 'goa', 'nagaland', 'tripura', 'manipur', 'meghalaya', 'arunachal-pradesh',
    'sikkim'
  ];

  const filteredStates = states.filter(state =>
    state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Select a State</h1>
      
      <input
        type="text"
        placeholder="Search for a state..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full max-w-md p-2 mb-4 border rounded"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStates.length > 0 ? (
          filteredStates.map((state, index) => (
            <Link
              key={index}
              to={`/state/${state}`}
              className="p-4 bg-white rounded shadow hover:shadow-lg transition-shadow"
            >
              {state.replace(/-/g, ' ').toUpperCase()}
            </Link>
          ))
        ) : (
          <p>No states found</p>
        )}
      </div>
    </div>
  );
};

export default Home