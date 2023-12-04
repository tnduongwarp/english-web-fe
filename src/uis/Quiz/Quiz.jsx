import React,{ useState, useEffect } from "react";
import Question from "./Question";
import Score from "./Score";
import { useParams } from "react-router-dom";
import Api from "../../services/Api";

const Quiz = () =>{
    const params = useParams();
    const [questionBank,setQuestionBank] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");
    const [score, setScore] = useState(0);
    const [quizEnd, setQuizEnd] = useState(false);
    const [loading,setLoading] = useState(true);
    const [correct, setCorrect] = useState(null);
   useEffect(() => {
    Api.getQuizByLessonId(params.id)
    .then(res => {
        setQuestionBank(res?.data.quiz);
        setLoading(false);
    })
    .catch(err => {
        console.log(err)
    })
    
   },[]);

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
            setScore((prevScore) => (prevScore+1));
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
       <div className="col-10">
        <h2 style={{ marginBottom:"20px", marginTop:"10px"}}>Complete this Quiz to done this lesson</h2>
        { !loading &&  
        <div className="App d-flex flex-column align-items-start justify-content-center" style={{marginLeft:"15px"}}>
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
                <Score
                    score={score}
                    onNextQuestion={handleNextQuestion}
                    className="score"
                />
            )}
        </div>
        }
        {
            loading && <div>Loading</div>
        }
    </div>
    )
}
export default Quiz