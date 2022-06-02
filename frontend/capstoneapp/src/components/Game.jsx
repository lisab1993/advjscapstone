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



  const getStoryData = async () => {
    try {
      //get the selected story and its pages
      const data = await axios.get(`http://localhost:1300/story/${game}`)
      const storyData = data.data
      setStory(storyData)
      setRips(storyData.ripsAllowed)
      
      const pagesData = data.data.pages
      setPages(pagesData)
      setPageCount(pagesData.length)
      const last = pagesData.pop()
      const first = (pagesData.splice(0, 1))[0]
      setFirstPage(first)
      setLastPage(last)


    } catch (err) {
      console.log(err)
    }
  }

  const checkStuff = async () => {
    //check state when a button is clicked
    console.log(story, 'story data')
    // console.log(pagesData, 'pagesData')
    // console.log(first, 'first page')
    // console.log(last, 'last page')
    console.log(counter, 'counter')
  }

  const upCounter = () => {
    //increases the state counter by 1
    setCounter(counter + 1)
  }




  useEffect(() => {
    getStoryData()
  }, [])


  return (
    <>
      <button onClick={checkStuff}>Check Stuff</button>
      {/* first page */}
      {counter === 1 &&
        <div>
          <p>{firstPage.body}</p>
          <p>Page: {firstPage.pageNumber}</p>
          <button onClick={upCounter}>Next Page</button>
        </div>}

      {/* pages between first and last */}
      {counter > 1 && counter < pageCount &&
        <div>it worked {counter}
          <button onClick={upCounter}>Next Page</button>
        </div>}

      {/* last page */}
      {counter === pageCount &&
        <div>
          <p>{lastPage.body}</p>
          <p>Page: {lastPage.pageNumber}</p>
        </div>}

        {/* Errors allowed */}
      <h1>Rips Remaining: {rips}</h1>
    </>
  )
}

export default Game