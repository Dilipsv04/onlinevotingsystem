import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const CityPage = () => {
  const { stateName, cityName } = useParams();
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const candidates = {
    'andhra-pradesh': {
      'visakhapatnam': [
        { name: 'Rajesh Kumar', party: 'BJP' },
        { name: 'Anita Reddy', party: 'INC' },
        { name: 'Chandru Naidu', party: 'YSRCP' },
        { name: 'Ravi Kumar', party: 'AAP' },
      ],
      'vijayawada': [
        { name: 'Suresh Babu', party: 'BJP' },
        { name: 'Priya Mehta', party: 'INC' },
        { name: 'Raghav Reddy', party: 'YSRCP' },
        { name: 'Amit Singh', party: 'AAP' },
      ],
    },
    'bihar': {
      'patna': [
        { name: 'Rajeev Ranjan', party: 'JD(U)' },
        { name: 'Priya Kumari', party: 'BJP' },
        { name: 'Pooja Yadav', party: 'RJD' },
        { name: 'Amit Kumar', party: 'INC' },
      ],
      'gaya': [
        { name: 'Sandeep Kumar', party: 'BJP' },
        { name: 'Asha Rani', party: 'INC' },
        { name: 'Sujay Yadav', party: 'JD(U)' },
        { name: 'Ravi Singh', party: 'RJD' },
      ],
    },
  };

  const cityCandidates = candidates[stateName]?.[cityName] || [];

  const handleVote = () => {
    if (selectedCandidate !== null) {
      alert(`You voted for ${cityCandidates[selectedCandidate].name} from ${cityCandidates[selectedCandidate].party}`);
    } else {
      alert('Please select a candidate');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        Vote for Candidates in {cityName.replace(/-/g, ' ').toUpperCase()} ({stateName.replace(/-/g, ' ').toUpperCase()})
      </h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        {cityCandidates.length > 0 ? (
          <div className="space-y-4">
            {cityCandidates.map((candidate, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-md">
                <input
                  type="radio"
                  id={`candidate-${index}`}
                  name="candidate"
                  value={index}
                  onChange={() => setSelectedCandidate(index)}
                  className="h-4 w-4 text-blue-600"
                />
                <label htmlFor={`candidate-${index}`} className="flex-1 cursor-pointer">
                  <span className="font-medium">{candidate.name}</span>
                  <span className="ml-2 text-gray-600">({candidate.party})</span>
                </label>
              </div>
            ))}
            
            <button
              onClick={handleVote}
              className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Submit Vote
            </button>
          </div>
        ) : (
          <p className="text-gray-600">No candidates found for this city.</p>
        )}
      </div>
      
      <Link
        to={`/state/${stateName}`}
        className="mt-4 inline-block text-blue-600 hover:text-blue-800"
      >
        ← Back to Cities
      </Link>
    </div>
  );
};

export default CityPage;