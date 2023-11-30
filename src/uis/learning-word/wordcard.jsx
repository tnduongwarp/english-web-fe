import React, { useState } from 'react';
import './style.css'
const WordCard = ({ word }) => {
    const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };
    
  return (
    <div className={`word-card ${isFlipped ? 'flipped' : ''}`} onClick={handleCardClick}>
      <div className="word front">
        <h3>{word.originalWord}</h3>
      </div>
      <div className="word back">
        <div className='item'>
            <div className='label'>Phiên âm</div>
            <div className='meaning'>{word.pronunciation}</div>
        </div>
        <div className='item'>
            <div className='label'>Vietnamese</div>
            <div className='meaning'>{word.meaning}</div>
        </div>
      </div>
    </div>
  );
};

export default WordCard;
{/* <div className='word-card'>
<div className='english'>
  <div className='item'>
      <div className='label'>Tiếng anh</div>
      <div className='word'>{word.originalWord}</div>
  </div>
  <div className='item'>
      <div className='label'>Phiên âm</div>
      <div className='word'>{word.pronunciation}</div>
  </div>
</div>

<div className='vietnamese'>
  <div className='item'>
          <div className='label'>Vietnamese</div>
          <div className='meaning'>{word.meaning}</div>
  </div>
</div>
</div> */}