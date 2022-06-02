import { useState, useGlobal, useEffect } from "reactn"
import { Navigate, Link } from "react-router-dom"
import axios from "axios"

const Game = () => {
  const [game, setGame] = useGlobal("game")//story id
  const [story, setStory] = useState({})//object with story info
  const [firstPage, setFirstPage] = useState({})//object with the first page info
  const [lastPage, setLastPage] = useState({})//object with last page info
  const [rips, setRips] = useState(0)//how many wrong answers are allowed

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
    // console.log(story, 'story data')
    // console.log(pagesData, 'pagesData')
    // console.log(first, 'first page')
    // console.log(last, 'last page')
    // console.log(counter, 'counter')
    // console.log(pageCount, 'page count')
    console.log(currentPage)
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


  return (
    <>
      <button onClick={checkStuff}>Check Stuff</button>
      {/* the game */}
      {rips > 0 && counter <= pageCount &&
        <div className="border-2 border-solid border-black">
          <p> The situation: {currentPage.body}</p>
          <p><button onClick={() => judgeAnswer(1)}>{currentPage.optionOne}</button></p>
          <p><button onClick={() => judgeAnswer(2)}>{currentPage.optionTwo}</button></p>
          <p>Page {currentPage.pageNumber}</p>
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