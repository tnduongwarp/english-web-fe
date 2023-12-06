import React,{ useState, useEffect } from "react";
import Question from "./Question";
import { SmileOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
import { useNavigate } from "react-router-dom";
import Api from "../../services/Api";

const ReadingQuiz = ({questionBank}) =>{    
    const nav = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");
    const [quizEnd, setQuizEnd] = useState(false);
    const [correct, setCorrect] = useState(null);
  
    const backToReading = () => {
        nav('/dashboard/reading')
    }
    const handleOptionChange = (e) => {
         setSelectedOption(e.target.value );
    };
 
    const handleFormSubmit =  (e) => {
        e.preventDefault();
        if(correct === 'incorrect' || correct === null)checkAnswer();
        if(correct ==='correct') {
            setCorrect(null);
            handleNextQuestion()
        }
    };
 
    const checkAnswer = () => {
        if (selectedOption === questionBank[currentQuestion][questionBank[currentQuestion].answer]) {
            setCorrect('correct');
            
        }else{
            setCorrect('incorrect')
        }
        console.log(correct)
    };
 
    const handleNextQuestion = () => {
        if (currentQuestion + 1 < questionBank.length) {
            setCurrentQuestion((prevCurrentQuestion) => (prevCurrentQuestion+1));
            setSelectedOption("")
        } else {
            setQuizEnd(true);
            let userId = localStorage['userId'];
            let lessonId = sessionStorage['lessonId'];
            Api.updateUserLessonStatus('Completed',new Date(), lessonId, userId)
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err))
        }
    };
    return (
       <div>
        { questionBank &&  questionBank.length>0 ?
        <div style={{marginLeft:"30px"}}>
            {!quizEnd ? (
                <>
                    <Question
                    question={questionBank[currentQuestion]}
                    selectedOption={selectedOption}
                    onOptionChange={handleOptionChange}
                    onSubmit={handleFormSubmit}
                    correct={correct}
                    />
                { (correct === 'correct') && <div style={{color:'green', fontStyle:'italic', margin:'10px 0px'}}>CORRECT</div>}
                { correct === 'incorrect' && <div style={{color:'red', fontStyle:'italic',  margin:'10px 0px '}}>INCORRECT</div>}
                </>
            ) : (
                <div style={{display:"flex", justifyContent:'center'}}>
                    <Result
                        icon={<SmileOutlined />}
                        title="Great, we have done this lessons!"
                        extra={<Button type="primary" onClick={backToReading}>Next</Button>}
                    />
                </div>
            )}
        </div>
        :
       <div>Loading</div>
        }
    
    </div>
    )
}
export default ReadingQuiz