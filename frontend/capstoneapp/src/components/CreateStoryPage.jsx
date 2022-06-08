import { useState, useGlobal, useEffect } from "reactn";
import axios from "axios";

const CreateStoryPage = (props) => {
  const [token, setToken] = useGlobal("token")
  const [pageState, setPageState] = useState({
    body: "",
    optionOne: "",
    optionTwo: "",
    optionOneImpact: true,
    optionTwoImpact: false,
    optionOneImpactStatement: "",
    optionTwoImpactStatement: "",
  });

  const [pagesMade, setPagesMade] = useState(0)

  const handleChange = (e) => {
    setPageState({
      ...pageState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()

  }

  const editStory = (event) => {
    event.preventDefault();
    props.storyToggle(false);
    console.log("clicked");
  };

  const checkStuff = () => {
    console.log(props.storyObj);
  };

  return (
    <>
      <div>Create a page to your story</div>

      <form>
        <input type="text" name="body" onChange={handleChange} value={pageState.body} className="border-2 border-solid border-black" placeholder="you walk into a room and see two paths..." />
      </form>

      <div>
        <button onClick={editStory}>Edit My Story</button>
      </div>
      <div>
        <button onClick={checkStuff}>Check Stuff</button>
      </div>
    </>
  );
};

export default CreateStoryPage;
