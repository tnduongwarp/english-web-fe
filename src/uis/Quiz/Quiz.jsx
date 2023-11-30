import React,{ useState, useEffect } from "react";
import Question from "./Question";
import Score from "./Score";
const qBank = [
    {
        id: 1,
        question: "What is the capital of Haryana?",
        options: ["Yamunanagar", "Panipat", "Gurgaon", "Chandigarh"],
        answer: "Chandigarh",
    },
    {
        id: 2,
        question: "What is the capital of Punjab?",
        options: ["Patiala", "Ludhiana", "Amritsar", "Chandigarh"],
        answer: "Chandigarh",
    },
    {
        id: 3,
        question: "What is the capital of India?",
        options: ["Delhi", "Mumbai", "Kolkata", "Chennai"],
        answer: "Delhi"
    },
    {
        id: 4,
        question: "What is the capital of Uttarakhad?",
        options: ["Roorkee", "Haridwar", "Dehradun", "Nanital"],
        answer: "Dehradun"
    },
    {
        id: 5,
        question: "What is capital of Uttar Pradesh?",
        options: ["GB Nagar", "Lucknow", "Prayagraj", "Agra"],
        answer: "Lucknow"
    },
]
const Quiz = () =>{
  
    const [questionBank,setQuestionBank] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");
    const [score, setScore] = useState(0);
    const [quizEnd, setQuizEnd] = useState(false);
    const [loading,setLoading] = useState(true);
    const [correct, setCorrect] = useState(null);
   useEffect(() => {
    setQuestionBank(qBank);
    setLoading(false)
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
        if (selectedOption === questionBank[currentQuestion].answer) {
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
            setQuizEnd(true)
        }
    };
    return (
       <>
        { !loading &&  
        <div className="App d-flex flex-column align-items-center justify-content-center">
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
       </>
    )
}
export default Quiz