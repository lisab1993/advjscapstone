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
      className="bg-cover bg-no-repeat h-screen flex-auto "
      style={{ backgroundImage: `url(${theme.premiseBackground})` }}
    >
      <Navbar />
      <div className="bg-neutral-700 text-white w-[35rem] mx-auto mt-5 text-center pt-20 h-[47rem] rounded-lg border-2 border-solid border-slate-400 flex-row">
        <span className="font-bold">{premise}</span>

        <div className="absolute bottom-24 px-5 w-[35rem] flex justify-between">
            <button className="text-white">
              <Link to="/howto">How to Play</Link>
            </button>
            <button className="text-white">
              <Link to="/game">Continue to Space Game</Link>
            </button>
        </div>


      </div>
    </div>
  );
};

export default PremisePage;
