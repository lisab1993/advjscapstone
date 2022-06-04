import { useState, useGlobal, useEffect } from "reactn";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const PremisePage = () => {
  const [game, setGame] = useGlobal("game"); //story id
  const [premise, setPremise] = useState("");
  const [theme, setTheme] = useGlobal("theme");

  const getPremise = async () => {
    let storyData = {};
    let themeData = {};
    const data = await axios.get(`http://localhost:1300/story/${game}`);
    storyData = data.data;
    setPremise(storyData.storyPremise);
    const getTheme = await axios.get(
      `http://localhost:1300/theme/${storyData.theme}`
    );
    themeData = getTheme.data;
    setTheme(themeData);
    console.log(themeData);
  };

  useEffect(() => {
    getPremise();
  }, []);

  return (
    <div
      className="h-screen"
      style={{ backgroundImage: `url(${theme.premiseBackground})` }}
    >
      <Navbar />
      <p className="text-white">{premise}</p>
      <p>
        <button className="text-white">
          <Link to="/game">Continue to Space Game</Link>
        </button>
      </p>
      <p>
        <button className="text-white">
          <Link to="/howto">How to Play</Link>
        </button>
      </p>
    </div>
  );
};

export default PremisePage;
