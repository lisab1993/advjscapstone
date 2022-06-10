import { useState, useGlobal, useEffect } from "reactn";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import LeftPage from "./LeftPage";
import RightPage from "./RightPage";
import WinningScreen from "./WinningScreen";
import LosingScreen from "./LosingScreen";


const Game = () => {
  const [game, setGame] = useGlobal("game"); //story id


  const [story, setStory] = useState({}); //object with story info
  const [firstPage, setFirstPage] = useState({}); //object with the first page info
  const [lastPage, setLastPage] = useState({}); //object with last page info
  const [rips, setRips] = useState(0); //how many wrong answers are allowed
  const [theme, setTheme] = useGlobal("theme"); //current theme

  const [pages, setPages] = useState([]); //every page for the story, including first and last
  const [counter, setCounter] = useState(1); //which page the user is on
  const [pageCount, setPageCount] = useState(0); //how many pages exist

  const [currentPage, setCurrentPage] = useState({}); //object of the currently displayed page
  const [hasChosen, setHasChosen] = useState(false); //has the player picked an option yet
  const [selectionRes, setSelectionRes] = useState(""); //the page's response to a right or wrong answer


  const getStoryData = async () => {
    try {
      //get the selected story and its pages
      //make sure the first is page number 1, and the last is the highest page number
      const data = await axios.get(`http://localhost:1300/story/${game}`);
      const storyData = data.data;
      const pagesData = storyData.pages;

      
      setStory(storyData);
      setRips(storyData.ripsAllowed);
      
      // console.log(pagesData, 'pagesData')
      setPageCount(pagesData.length);
      // const last = pagesData.pop();
      let first = pagesData.filter((obj) => obj.pageNumber === 1)
      first = first[0]
      const firstIndex = pagesData.indexOf(first)
      console.log(firstIndex)
      let last = pagesData.filter((obj) => obj.pageNumber === pagesData.length)
      last = last[0]
      const lastIndex = pagesData.indexOf(last)
      console.log(lastIndex)
      pagesData.splice(firstIndex, 1)
      pagesData.splice(lastIndex-1, 1)
      // const first = pagesData.splice(0, 1)[0];
      setFirstPage(first);
      setCurrentPage(first);
      setLastPage(last);
      setPages(pagesData);
    } catch (err) {
      console.log(err);
    }
  };

  const checkStuff = async () => {
    //check state when a button is clicked
    console.log(story, "story");
  };

  //The randInt and randomChoice functions were taken from class lemur's repo: https://tinyurl.com/muhbr72c
  const randint = (a, b) => {
    return Math.floor(a + Math.random() * (b - a + 1));
  };

  const randomChoice = (arr) => {
    let i = randint(0, arr.length - 1);
    return arr[i];
  };

  const upCounter = () => {
    //increases the state counter by 1
    setCounter(counter + 1);
    //this runs before the counter updates, so the -1 keeps it synchronized
    if (counter < pageCount - 1) {
      let randPage = randomChoice(pages);
      setCurrentPage(randPage);
      let randIndex = pages.indexOf(randPage);
      pages.splice(randIndex, 1);
    } else {
      setCurrentPage(lastPage);
    }
    setHasChosen(false);
  };

  useEffect(() => {
    getStoryData();
  }, []);

  

  const judgeAnswer = (selection) => {
    let oneRes = currentPage.optionOneImpact;
    let twoRes = currentPage.optionTwoImpact;
    let response = "";

    if (selection === 1 && oneRes === true) {
      //correct answer was 1, and user chose 1
      response = currentPage.optionOneImpactStatement;
      setSelectionRes(response);
    } else if (selection === 1 && oneRes === false) {
      //correct answer was 2, but user chose 1
      response = currentPage.optionOneImpactStatement;
      setRips(rips - 1);
      setSelectionRes(response);
    } else if (selection === 2 && twoRes === true) {
      //correct answer was 2, and user chose 2
      response = currentPage.optionTwoImpactStatement;
      setSelectionRes(response);
    } else {
      //correct answer was 1, but user chose 2
      response = currentPage.optionTwoImpactStatement;
      setRips(rips - 1);
      setSelectionRes(response);
    }
    setHasChosen(true);
  };

  //add this before every image in the db
  // https://drive.google.com/uc?export=view&id=
  return (
    <>
      {/* <button onClick={checkStuff}>Check Stuff</button> */}
      {rips > 0 && counter <= pageCount && (
        <div
          className="bg-cover bg-no-repeat h-screen flex-auto relative"
          style={{ backgroundImage: `url(${theme.backgroundImage})` }}
        >
          <Navbar />
          {/* book image */}
          <p className="absolute">
            <img src={theme.bookImage} className="w-7/12 mx-auto" />
          </p>

          {/* left page */}
          {/* note: on the component- don't always have option 1 at the top; the player might always write their good option on top, or vice versa, so randomizing the two will keep it fun */}
          <LeftPage
            currentPage={currentPage}
            hasChosen={hasChosen}
            judgeAnswer={judgeAnswer}
            counter={counter}
          />

          {/* right page */}
          {hasChosen === true && (
            <RightPage selectionRes={selectionRes} upCounter={upCounter} />
          )}
        </div>
      )}

      {/* winning screen */}
      {rips > 0 && counter > pageCount && <WinningScreen winningStatement={story.winningStatement} theme={theme} />}

      {/* losing screen */}
      {rips === 0 && <LosingScreen losingStatement = {story.losingStatement} theme={theme} />}
    </>
  );
};

export default Game;
