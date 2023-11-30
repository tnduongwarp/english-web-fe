import React from "react";
const Score = ({score, onNextQuestion}) => {
    return (
        <div>
            <h2>Results</h2>
            <h4>Your score: {score}</h4>
        </div>
    );
}
export default Score