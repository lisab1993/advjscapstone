import { Link } from "react-router-dom"
import { useState, useGlobal } from "reactn";

const QuickStartButton = () => {
    const [game, setGame] = useGlobal("game")

    const handleClick = (event) => {
        event.preventDefault();
            setGame("62983e21603234480ebed1a3")
    }

    return (
        <button onClick={(event) => handleClick(event)}><Link to="/premise" >Quick Start -Space</Link></button>
        
    )
}

export default QuickStartButton