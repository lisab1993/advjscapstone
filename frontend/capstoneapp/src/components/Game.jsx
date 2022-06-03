import { useState, useGlobal, useEffect } from "reactn"
import { Navigate, Link } from "react-router-dom"
import axios from "axios"

const Game = () => {
  const [game, setGame] = useGlobal("game")//story id
  const [story, setStory] = useState({})//object with story info
  const [firstPage, setFirstPage] = useState({})//object with the first page info
  const [lastPage, setLastPage] = useState({})//object with last page info
  const [rips, setRips] = useState(0)//how many wrong answers are allowed
  const [theme, setTheme] = useState('')//current theme

  const [pages, setPages] = useState([])//every page for the story, including first and last
  const [counter, setCounter] = useState(1)//which page the user is on
  const [pageCount, setPageCount] = useState(0)//how many pages exist

  const [currentPage, setCurrentPage] = useState({})//object of the currently displayed page
  const [hasChosen, setHasChosen] = useState(false)//has the player picked an option yet
  const [selectionRes, setSelectionRes] = useState('')//the page's response to a right or wrong answer



  const getStoryData = async () => {
    try {
      //get the selected story and its pages
      const data = await axios.get(`http://localhost:1300/story/${game}`)
      const storyData = data.data
      const getTheme = await axios.get(`http://localhost:1300/theme/${storyData.theme}`)
      const themeData = getTheme.data
      setTheme(themeData)
      setStory(storyData)
      setRips(storyData.ripsAllowed)

      const pagesData = data.data.pages
      setPageCount(pagesData.length)
      const last = pagesData.pop()
      const first = (pagesData.splice(0, 1))[0]
      setFirstPage(first)
      setCurrentPage(first)
      setLastPage(last)
      setPages(pagesData)
    } catch (err) {
      console.log(err)
    }

  }

  const checkStuff = async () => {
    //check state when a button is clicked
    console.log(theme, 'theme')
  }

  //The randInt and randomChoice functions were taken from class lemur's repo: https://tinyurl.com/muhbr72c
  const randint = (a, b) => {
    return Math.floor(a + Math.random() * (b - a + 1))
  }

  const randomChoice = (arr) => {
    let i = randint(0, arr.length - 1)
    return arr[i]
  }

  const upCounter = () => {
    //increases the state counter by 1
    setCounter(counter + 1)
    //this runs before the counter updates, so the -1 keeps it synchronized
    if (counter < pageCount - 1) {
      let randPage = randomChoice(pages)
      setCurrentPage(randPage)
      let randIndex = pages.indexOf(randPage)
      pages.splice(randIndex, 1)
    } else {
      setCurrentPage(lastPage)
    }
    setHasChosen(false)
  }

  useEffect(() => {
    getStoryData()
  }, [])

  const judgeAnswer = (selection) => {
    let oneRes = currentPage.optionOneImpact
    let twoRes = currentPage.optionTwoImpact
    let response = ''

    if (selection === 1 && oneRes === true) {
      //correct answer was 1, and user chose 1
      response = currentPage.optionOneImpactStatement
      setSelectionRes(response)
    } 
    else if (selection === 1 && oneRes === false) {
      //correct answer was 2, but user chose 1
      response = currentPage.optionOneImpactStatement
      setRips(rips - 1)
      setSelectionRes(response)
    }
    else if (selection === 2 && twoRes === true) {
      //correct answer was 2, and user chose 2
      response = currentPage.optionTwoImpactStatement
      setSelectionRes(response)
    }
    else {
      //correct answer was 1, but user chose 2
      response = currentPage.optionTwoImpactStatement
      setRips(rips - 1)
      setSelectionRes(response)
    }
    setHasChosen(true)
  }

  //add this before every image in the db
  // https://drive.google.com/uc?export=view&id=
  //
  return (
    <>
      {/* <button onClick={checkStuff}>Check Stuff</button> */}
      {/* the game */}
      {rips > 0 && counter <= pageCount &&
        <div className="border-solid border-2 border-black relative text-center ">
          <img src={theme.backgroundImage} className="absolute w-screen h-max"/>
          {/* <p className="absolute text-white"> The situation: {currentPage.body}</p>
          <p><button disabled={hasChosen === true} onClick={() => judgeAnswer(1)}>{currentPage.optionOne}</button></p>
          <p><button disabled={hasChosen === true} onClick={() => judgeAnswer(2)}>{currentPage.optionTwo}</button></p>
          <p>Page {currentPage.pageNumber}</p> */}
          <p><img src={theme.bookImage} className="absolute w-5/6"/></p>
          {hasChosen === true &&
            <div>
              <p><button className="bg-teal-300" onClick={upCounter}>Next Page</button></p>
              <p>{selectionRes}</p>
            </div>}
        </div>
      }

      {rips > 0 && counter > pageCount && <div>you win!</div>}

      {/* losing screen */}
      {rips === 0 && <div>Sorry, you lose</div>}

      {/* winning screen */}
      {/* they win if rips are greater than 0 and the last page was played */}


      {/* Errors allowed */}
      <h1>Rips Remaining: {rips}</h1>
    </>
  )
}

export default Game