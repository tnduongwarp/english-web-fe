// App.js
import React from 'react';
import WordList from './WordList';

const words = [
  { wordId: 1, originalWord: 'Example1', meaning: 'Meaning1', pronunciation: 'Pronunciation1' },
  { wordId: 2, originalWord: 'Example2', meaning: 'Meaning2', pronunciation: 'Pronunciation2' },
  // Add more words as needed
];

const VocabularyLesson = () => {
  return (
    <div>
      <h1 style={{textAlign:"center", padding:"15px"}}>Word Display App</h1>
      <div style={{display:'flex', justifyContent:"center"}}>
        <WordList words={words} />
      </div>
      
    </div>
  );
};

export default VocabularyLesson;