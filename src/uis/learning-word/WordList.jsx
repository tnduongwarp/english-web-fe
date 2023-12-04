import React, { useState } from 'react';
import WordCard from './wordcard';
import { useNavigate } from "react-router-dom";
import './style.css';
import { LeftOutlined, RightOutlined,SmileOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
const WordList = ({ words}) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const handleNextClick = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }else if(currentIndex === words.length -1){
      setCompleted(true);
    }
  };
  const handlebackClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const goToQuiz = () => {
    const lessonId = sessionStorage['lessonId'];
    navigate('/dashboard/vocabulary/quiz/'+lessonId);
  }

  return (
   <>
    { !completed && 
      <div className="word-list-container">
        <button className='button' onClick={handlebackClick}> <LeftOutlined style={{fontSize:"40px",  marginBottom:'10px'}}/> Back</button>
        <WordCard word={words[currentIndex]} />
        <button className='button' onClick={handleNextClick}><RightOutlined style={{fontSize:"40px",  marginBottom:'10px'}} />Next</button>
      </div>
    }
     {
        completed && 
        <Result
        icon={<SmileOutlined />}
        title="Great, we have done all the words. Now let completed a small Quiz to done this lesson!"
        extra={<Button type="primary" onClick={goToQuiz}>Next</Button>}
        />
     }
   </>
  );
};

export default WordList;