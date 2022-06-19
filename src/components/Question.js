import React from "react"
import Answer from "./Answer"

export default function Question (props){
    const [userChoice, setUserChoice] = React.useState({
        question: props.id,
        answer: ""
    })
    

    
    const answerElements = props.answers.map((item, index) => (
        <Answer
            key={`${props.id}${index}`}
            questionId={props.id}
            answerId={`${props.id}${index}`}
            answer={item.answer}
            isCorrect={item.isCorrect}
            quizState={props.quizState}
            setQuizState={props.setQuizState}
            userChoice={userChoice}
            setUserChoice={setUserChoice}
        />
    ))
    
    return (
        <div className="question--container">
            <p className="question">{props.question}</p>
            <div className="answers">
                {answerElements}
            </div>
        </div>
    )
}

    