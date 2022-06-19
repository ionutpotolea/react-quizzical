import React from "react"
import IntroPage from "./components/IntroPage"
import Question from "./components/Question"
import {nanoid} from 'nanoid'
import background from "./img/bg-blobs.svg"

export default function App () {
    const [quizState, setQuizState] = React.useState({
        started: false,
        submitted: false,
        userSolutions: {},
        correctUserAnswers: 0
        })
    const [quizData, setQuizData] = React.useState([])
    
    React.useEffect(() => {
        if (quizState.started){
            fetch('https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple')
            .then(res => res.json())
            .then(data => {
                const processedData = data.results.map(item => {
                    item.question = decodeHtml(item.question)
                    const answers = item.incorrect_answers.map(answer => {
                        return {
                            answer: decodeHtml(answer),
                            isCorrect: false,
                        }
                    })
                    answers.unshift({
                        answer: decodeHtml(item.correct_answer),
                        isCorrect: true,
                    })
                    delete item.correct_answer
                    delete item.incorrect_answers
                    
                    return {
                        id: nanoid(),
                        ...item,
                        answers: shuffle(answers)
                    }
                })
                setQuizData(processedData)
            })
        }
    }, [quizState.started])
    
    React.useEffect(() => {
        const answeredQuestions = Object.keys(quizState.userSolutions).length
        if(answeredQuestions){
            const userAnswersData = Object.keys(quizState.userSolutions).map(question => {
                const userAnswer = quizState.userSolutions[question]
                const currentQuestionData = quizData.filter(item => item.id === question)
                const currentAnswerData = currentQuestionData[0].answers.filter(item => item.answer === userAnswer)
                return currentAnswerData[0]
            })
            const correctUserAnswers = userAnswersData.filter(item => item.isCorrect)
            setQuizState(prevState => ({
                ...prevState,
                correctUserAnswers: correctUserAnswers.length
            }))
        }
        
    }, [quizState.userSolutions])
    
    const quizDataElements = quizData.map(quizItem => {
        return <Question
            key={quizItem.id}
            index={quizItem.index}
            id={quizItem.id}
            question={quizItem.question}
            answers={quizItem.answers}
            quizState={quizState}
            setQuizState={setQuizState}
        />
    })
    
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }

        return array;
    }
    
    function decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }
    
    function submitQuiz(){
        setQuizState(prevState => ({...prevState, submitted: true}))
    }

    function resetQuiz(){
        setQuizState({
            started: false,
            submitted: false,
            userSolutions: {},
            correctUserAnswers: 0
        })
        setQuizData([])
    }
    
    return (
        <div id="container" style={{ backgroundImage: `url(${background})` }}>
            {!quizState.started && <IntroPage handleClick={() => setQuizState(prevState => ({...prevState, started: true}))}/>}
            {quizState.started && (
            <div className={quizState.submitted?
                    "question-page submitted" :
                    "question-page unsubmitted"}>
                {quizDataElements}
                <section className="bottom-section">
                    {!quizState.submitted ?
                        <button
                            onClick={submitQuiz}
                        >Check answers
                        </button> :
                        <div>
                            <span className="result"> You scored {quizState.correctUserAnswers}/{quizData.length} correct answers</span>
                            <button
                                onClick={resetQuiz}
                            >Play Again
                            </button>
                        </div>
                    }
                </section>
            </div>
            )}
        </div>
    )
}