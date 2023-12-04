// App.js
import React, { useEffect , useState} from 'react';
import WordList from './WordList';
import Api from '../../services/Api';

const VocabularyLesson = () => {
  const [words, setWords] = useState([])
  useEffect(() => {
    let lessonId = sessionStorage['lessonId'];
    let userId = localStorage['userId']
    Api.updateUserLessonStatus('Inprogress', new Date(), lessonId, userId)
    .then(res => {
      console.log(res);
      
    })
    .catch(err => console.log(err))
  },[])
  
  useEffect(() => {
    let wordIds = sessionStorage['wordIds'].split(',');
    console.log( wordIds)
    Api.getWordsForLesson(wordIds)
    .then(res => {
      console.log(res);
      setWords(res?.data.data)
    })
    .catch(err => console.log(err))
  },[])
  
  return (
      <div className='col-10'>
        <h1 style={{textAlign:"center", padding:"15px"}}> Important words</h1>
        <div style={{display:'flex', justifyContent:"center"}}>
          {words.length && <WordList words={words} />}
        </div>
      </div>
  );
};

export default VocabularyLesson;