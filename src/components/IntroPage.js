import React from "react"

export default function IntroPage (props){
    return (
        <div className="intro--page">
            <h2 className="intro--title">Quizzical</h2>
            <p className="intro--description">Welcome to our Quiz!<br />You will get five questions to answer.<br />Good luck!</p>
            <button className="intro--button" onClick={props.handleClick}>Start quiz</button>
        </div>
    )
}