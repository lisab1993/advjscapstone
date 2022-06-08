import Navbar from "../components/Navbar";
import CreateStory from "../components/CreateStory";
import CreateStoryPage from "../components/CreateStoryPage";
import { useState, useGlobal, useEffect } from "reactn";
import axios from "axios";
import { Navigate } from "react-router-dom";

//story needs a title, private (bool), ripsAllowed, storyPremise, theme (currently only space theme)
// story, pageNumber, and author will be handled automatically behind the scenes
//do an axios call to get all themes
// x chars for title
// any number of rips allowed, but when the play tries to finish submitting pages: if there are as many or more rips allowed than there are pages, warn the player that it's impossible to lose the game, but they can continue if they wish
//have a button for the first and last pages; the first page must have it's pageNumber set to 1, and the last page must have it's pageNumber set to the lenth of pages for the story; everything else will be in the order added (if they make a first/last page, before making all other pages, the counter will not count the first/last page and will continue where it left off)
//an anonymous story means that the story is public, but the username is not displayed


//page needs a body, optionOne, optionTwo (str), optionOneImpact (bool), optionTwoImpact, optionOneImpactStatement (str), optionTwoImpactStatement,
//have a pre-filled premise already there that the user can delete or edit, and also to help guide the player
//for the options prefill, make it super obvious, like add: 'this is the bad option, this is the good option'. The first option won't always appear first, so it doesn't matter which option goes where
//one has to be true, the other has to be false -there can't be two trues/falses
//user should be able to go back and edit any page in the creation proces.
//after a page is created, it's added to the db. When they click on an old page to edit it, do a get request for that page, and a put request to edit it.
//page rules:
// 763 chars for the body
// 412 for the choices
// 800 ish for the results

const CreationPage = () => {
  //refers to the currently viewed page, either being created or edited

  const [editStory, setEditStory] = useState(false);//determines if we're editing a story, or its pages; true means we're editing the story, false means we're editing the pages
  const [storyObj, setStoryObj] = useState({})
  const [user, setUser] = useGlobal("user")

  const storyToggle = (bool) => {
      //switch between editing a page or a story
      (bool ? setEditStory(true) : setEditStory(false))
  };



  return (
    <div>
      <Navbar />
      {editStory ? (
        <CreateStoryPage storyToggle={storyToggle} editStory={editStory} storyObj={storyObj} />
      ) : (
        <CreateStory storyToggle={storyToggle} editStory={editStory}  storyObj={storyObj} setStoryObj={setStoryObj} />
      )}
    </div>
  );
};

export default CreationPage;
