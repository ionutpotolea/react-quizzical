import React from "react"

export default function Answer (props) {
    function handleChange(){
        props.setUserChoice(prevState => ({
            ...prevState,
            answer: props.answerId
        }))
        props.setQuizState(prevState => {return ({
            ...prevState,
            userSolutions:  {
                                ...prevState.userSolutions,
                                [props.questionId]: props.answer
                            }
        })})
    }

    function submittedLabelStyle(){
        if (props.quizState.submitted){
            if (props.isCorrect) return "isCorrect"
            if (props.userChoice.answer === props.answerId && !props.isCorrect) return "isWrong"
        } else return ""
    }
   
    return (
        <span>
            <input 
                type="radio"
                value={props.answer}
                name={props.questionId}
                id={props.answerId}
                onChange={handleChange}
                checked={props.userChoice.answer === props.answerId}
                disabled={props.quizState.submitted}
            />
            <label
                htmlFor={props.answerId}
                className={submittedLabelStyle()}>
                {props.answer}</label>
        </span>
    )
}

