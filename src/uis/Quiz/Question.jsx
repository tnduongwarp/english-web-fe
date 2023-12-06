import React from "react";
import Options from "./Options"

const Question = ({question, selectedOption, onOptionChange, onSubmit, correct}) => {
    console.log(question)
    return(
        <div className="">
            <h3>Question {question?.id}</h3>
            <div style={{fontSize:'1.25rem', fontStyle:'italic'}}>{question?.content}</div>
            <form onSubmit={onSubmit} className="mt-2 mb-2">
                <Options
                    options={[question.A, question.B, question.C, question.D]}
                    selectedOption={selectedOption}
                    onOptionChange={onOptionChange}
                />
                <button type="submit" className="btn btn-primary mt-2">
                    { correct==='correct' ? 'NEXT':'SUBMIT'}
                </button>
            </form>
        </div>
    )
}
export default Question