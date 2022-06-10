import { Link } from "react-router-dom";
import QuickStartButton from "../components/QuickStartButton";
import Navbar from "../components/Navbar";
import libraryBackground from "../images/libraryBackground.jpg";

const HomePage = () => {
  return (
    <div>
      <div
        style={{ backgroundImage: `url('${libraryBackground}')` }}
        className="h-screen bg-no-repeat bg-cover flex-auto"
      >
        <Navbar />
        <h1 className="text-center pt-5 font-Joan text-6xl font-bold">
          The Library
        </h1>
        <div className="bg-rose-400 w-[20rem] h-[20rem] text-center rounded mx-auto mt-64">
          <p className="font-bold font-serif text-3xl pb-3">Quickstart Titles:</p>
          <QuickStartButton></QuickStartButton>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
