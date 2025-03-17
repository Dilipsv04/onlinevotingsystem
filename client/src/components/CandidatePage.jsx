import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Dummy candidate data
const candidateNames = ['Rajesh Kumar', 'Anita Reddy', 'Chandru Naidu', 'Ravi Kumar'];
const partyNames = ['BJP', 'INC', 'YSRCP', 'RJD'];

const getRandomCandidate = () => {
  const name = candidateNames[Math.floor(Math.random() * candidateNames.length)];
  const party = partyNames[Math.floor(Math.random() * partyNames.length)];
  return { name, party };
};

const CandidatePage = () => {
  const { stateName, cityName } = useParams();
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  useEffect(() => {
    // Generate random candidates for the city (3 candidates per city)
    const generatedCandidates = Array.from({ length: 3 }, getRandomCandidate);
    setCandidates(generatedCandidates);
  }, [cityName]);

  const handleSubmit = () => {
    if (selectedCandidate !== null) {
      alert(You voted for ${candidates[selectedCandidate].name} from ${candidates[selectedCandidate].party});
    } else {
      alert('Please select a candidate');
    }
  };

  return (
    <div>
      <h1>Vote for Candidates in {cityName.replace(/-/g, ' ').toUpperCase()} ({stateName.replace(/-/g, ' ').toUpperCase()})</h1>
      
      {candidates.length > 0 ? (
        candidates.map((candidate, index) => (
          <div key={index}>
            <input
              type="radio"
              id={candidate-${index}}
              name="candidate"
              value={index}
              onChange={() => setSelectedCandidate(index)}
            />
            <label htmlFor={candidate-${index}}>{candidate.name} ({candidate.party})</label>
          </div>
        ))
      ) : (
        <p>No candidates found for this city.</p>
      )}

      <button onClick={handleSubmit}>Submit Vote</button>
    </div>
  );
};

export default CandidatePage;