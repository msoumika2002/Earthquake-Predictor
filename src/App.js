import React, { useState } from 'react';
import './predict.css';

function App() {
  const [formData, setFormData] = useState({
    latitude: null,
    longitude: null,
  });
  const [resultText, setResultText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/earthquake_prediction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => setResultText(data.message))
      .catch((error) => console.error(error));
  };

  const handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className='dinpf'>
        <form onSubmit={handleSubmit}>
          <h3>EARTHQUAKE MAGNITUTE PREDICTION</h3>
          <div>
            <label>Latitude:</label>
            <input
              type='number'
              name='latitude'
              value={formData.latitude || ''}
              step='0.1'
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Longitude:</label>
            <input
              type='number'
              name='longitude'
              value={formData.longitude || ''}
              step='0.1'
              onChange={handleInputChange}
            />
          </div>

          <div className='predict-btn'>
            <button type='submit'>Predict</button>
          </div>
          <div className='result'>{resultText}</div>
        </form>
      </div>
    </div>
  );
}

export default App;

