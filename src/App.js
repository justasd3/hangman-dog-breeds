import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Hangman from './components/Hangman.js';

function App() {
  const [data, setData] = useState([])

  const getWord = () => {
    axios.get('https://dog.ceo/api/breeds/list/random')
      .then((response) => {
        console.log(response)
        const word = response.data.message
        setData(String(word))
      })
  }

  useEffect(() => getWord(), []);

  return (
    <div className="App">
      <header className="App-header">
        <Hangman data={data} reset={getWord} />
      </header>
    </div>
  );
}

export default App;
