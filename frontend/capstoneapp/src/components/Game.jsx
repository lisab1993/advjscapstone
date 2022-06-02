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

  const [currentPage, setCurrentPage] = useState({})


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
    console.log(counter, 'counter')
    console.log(pageCount, 'page count')
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
      // console.log(randPage, 'randpage')
      // console.log(pages, 'pages')
      // console.log('\n \n')
    } else {
      setCurrentPage(lastPage)
    }
  }

  useEffect(() => {
    getStoryData()
  }, [])

  const judgeAnswer = (selection) => {
    //the selection will be either 1 or 2
    //variable to hold option 1's boolean
    //variable to hold option 2's boolean
    //compare them
  }



  return (
    <>
      {/* <button onClick={checkStuff}>Check Stuff</button> */}

      <div className="border-2 border-solid border-black">
        <p> The situation: {currentPage.body}</p>
        <button onClick={judgeAnswer(1)}>{currentPage.optionOne}</button>
        <button onClick={judgeAnswer(2)}>{currentPage.optionTwo}</button>
        <p>Page {currentPage.pageNumber}</p>
          {counter < pageCount && <p><button className="bg-teal-300" onClick={upCounter}>Next Page</button></p>}
        
      </div>

      {/* Errors allowed */}
      <h1>Rips Remaining: {rips}</h1>
    </>
  )
}

export default Game