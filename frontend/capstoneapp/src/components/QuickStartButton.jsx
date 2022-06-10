import { Link } from "react-router-dom"
import { useState, useGlobal } from "reactn";

const QuickStartButton = () => {
    const [game, setGame] = useGlobal("game")

    const handleClick = (event) => {
        event.preventDefault();
            setGame("62983e21603234480ebed1a3")
    }

    return (
        <button onClick={(event) => handleClick(event)}><Link to="/premise" className="font-bold text-xl hover:text-2xl" >Falling Into Black Holes</Link></button>
        
    )
}

export default QuickStartButton