import { Link } from "react-router-dom"
import { useState, useGlobal } from "reactn";

const QuickStartButton = () => {
    const [game, setGame] = useGlobal("game")

    const handleClick = (event) => {
        event.preventDefault();
            setGame("6296903320f437987e1cc4d6")
    }

    return (
        <button onClick={(event) => handleClick(event)}><Link to="/game" >Quick Start</Link></button>
        
    )
}

export default QuickStartButton