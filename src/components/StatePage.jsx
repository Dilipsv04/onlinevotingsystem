import React from 'react';
import { useParams, Link } from 'react-router-dom';

const citiesData = {
  'andhra-pradesh': ['visakhapatnam', 'vijayawada', 'tirupati', 'rajahmundry', 'kakinada'],
  'bihar': ['patna', 'gaya', 'bhagalpur', 'munger', 'muzaffarpur'],
  'gujarat': ['ahmedabad', 'surat', 'vadodara', 'rajkot', 'bhavnagar'],
  'maharashtra': ['mumbai', 'pune', 'nagpur', 'aurangabad', 'nashik'],
  'delhi': ['new-delhi', 'old-delhi', 'dwarka', 'vasant-vihar', 'karol-bagh'],
  'uttar-pradesh': ['lucknow', 'varanasi', 'kanpur', 'agra', 'allahabad'],
  'west-bengal': ['kolkata', 'darjeeling', 'siliguri', 'asansol', 'howrah'],
  'rajasthan': ['jaipur', 'udaipur', 'jodhpur', 'ajmer', 'kota'],
  'tamil-nadu': ['chennai', 'coimbatore', 'madurai', 'trichy', 'salem'],
  'kerala': ['thiruvananthapuram', 'kochi', 'kozhikode', 'thrissur', 'palakkad'],
  'karnataka': ['bengaluru', 'mysuru', 'hubli', 'mangaluru', 'belgaum']
};

const StatePage = () => {
  const { stateName } = useParams();
  const cities = citiesData[stateName] || [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Cities in {stateName.replace(/-/g, ' ').toUpperCase()}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cities.length > 0 ? (
          cities.map((city, index) => (
            <Link
              key={index}
              to={`/state/${stateName}/city/${city}`}
              className="p-4 bg-white rounded shadow hover:shadow-lg transition-shadow"
            >
              {city.replace(/-/g, ' ').toUpperCase()}
            </Link>
          ))
        ) : (
          <p>No cities found for this state.</p>
        )}
      </div>
      
      <Link to="/home" className="mt-4 inline-block p-2 bg-blue-500 text-white rounded">
        Back to States
      </Link>
    </div>
  );
};

export default StatePage;