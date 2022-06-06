import { useState, useGlobal, useEffect } from "reactn";
import axios from "axios";

const CreateStory = () => {
  const [storyState, setStoryState] = useState({
    title: "",
    private: false,
    anonymous: false,
    ripsAllowed: 5,
    storyPremise: "",
    themeSelection: {},
  });
  const [allThemes, setAllThemes] = useState([]); //all of the themes to chose from

  const handleChange = (e) => {
    setStoryState({
      ...storyState,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };

  const handleRadioBoolChange = (e) => {
    if (e.target.value === "true") {
      setStoryState({
        ...storyState,
        [e.target.name]: true,
      });
    } else if (e.target.value === "false") {
      setStoryState({
        ...storyState,
        [e.target.name]: false,
      });
    }
  };

  const getThemes = async () => {
    const { data } = await axios.get("http://localhost:1300/theme/");
    setAllThemes(data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submitted");
  };

  const checkStuff = () => {
    // console.log(storyState.title, "title");
    console.log(storyState.private, "private");
    console.log(storyState.anonymous, "anon");
  };

  useEffect(() => {
    getThemes();
  }, []);

  return (
    <>
      <button onClick={checkStuff}>check stuff</button>
      <form onSubmit={handleSubmit}>
        {/* story title */}
        <div className="mb-5">
          <p>Story Title</p>
          <input
            type="text"
            name="title"
            placeholder="title"
            onChange={handleChange}
            value={storyState.title}
            className="border-2 border-solid border-black"
          />
        </div>

        {/* theme */}
        {/* dropdown or radio buttons */}
        <div>
          <p>Choose the theme of your story</p>
          <select className="border-2 border-solid border-black">
            {allThemes.map((themeObj) => (
              <option key={themeObj._id}>{themeObj.title}</option>
            ))}
          </select>
        </div>

        {/* private */}
        {/* radio buttons */}
        <div className="mb-5">
          <p>Do you want others to be able to see your story?</p>
          <span>Yes</span>
          <input
            type="radio"
            name="private"
            onChange={handleRadioBoolChange}
            value="true"
          />
          <span>No</span>
          <input
            type="radio"
            name="private"
            onChange={handleRadioBoolChange}
            value="false"
            checked={storyState.private === false}
          />
        </div>

        {/* anonymous */}
        {/* conditional radio buttons */}
        {storyState.private ? (
          <div className="mb-5">
            <p>Do you want your story posted anonymously?</p>
            <span>Yes</span>
            <input
              type="radio"
              name="anonymous"
              onChange={handleRadioBoolChange}
              value="true"
            />
            <span>No</span>
            <input
              type="radio"
              name="anonymous"
              onChange={handleRadioBoolChange}
              value="false"
              checked={storyState.anonymous === false}
            />
          </div>
        ) : (
          <></>
        )}

        {/* rips allowed */}
        <div>
          <p>How many mistakes can someone make before they fail?</p>
          <input type="number" className="border-2 border-solid border-black" />
        </div>

        {/* story premise */}
        <div className="mb-5">
          <p>Story premise</p>
          <input
            type="text"
            name="storyPremise"
            placeholder="once upon a time..."
            onChange={handleChange}
            value={storyState.storyPremise}
            className="border-2 border-solid border-black"
          />
        </div>
      </form>
    </>
  );
};

export default CreateStory;
