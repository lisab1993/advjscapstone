import { useState, useGlobal, useEffect } from "reactn";
import axios from "axios";

const CreateStory = (props) => {
  //props: storyToggle : takes in a string of 'true' or 'false'
  //props: storyObj, setStoryObj
  const [user, setUser] = useGlobal("user");
  const [token, setToken] = useGlobal("token");
  const [storyState, setStoryState] = useState({
    title: "",
    private: false,
    anonymous: false,
    ripsAllowed: 5,
    storyPremise: "",
    themeSelection: "629a97c81953f7eaed0129c7",
    //defaults to the space theme (tested successfully with id from the ocean theme)
  });
  const [allThemes, setAllThemes] = useState([]); //all of the themes to chose from

  const handleChange = (e) => {
    setStoryState({
      ...storyState,
      [e.target.name]: e.target.value,
    });
    // console.log(e.target.value, 'e.target.value');
    // console.log(e.target.name)
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
    if (Object.keys(props.storyObj).length === 0) {
      const { data } = await axios.post(
        "http://localhost:1300/story/",
        {
          title: storyState.title,
          author: user._id,
          private: storyState.private,
          anonymous: storyState.anonymous,
          ripsAllowed: storyState.ripsAllowed,
          storyPremise: storyState.storyPremise,
          theme: storyState.themeSelection,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data, "post request data");
      props.setStoryObj(data);
      props.storyToggle(true);
    } else {
      const patchData = await axios.patch(
        `http://localhost:1300/story/${props.storyObj._id}`,
        {
          title: storyState.title,
          author: user._id,
          private: storyState.private,
          anonymous: storyState.anonymous,
          ripsAllowed: storyState.ripsAllowed,
          storyPremise: storyState.storyPremise,
          theme: storyState.themeSelection,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(patchData.data, "patchData");
      props.setStoryObj(patchData.data);
      props.storyToggle(true);
    }
  };

  const checkStuff = (e) => {
    e.preventDefault();
    // console.log(storyState.title, "title");
    // console.log(user._id, "user id");
    console.log(storyState.private, "private");
    console.log(storyState.anonymous, "anon");
    // console.log(storyState.ripsAllowed, "rips");
    // console.log(storyState.storyPremise, "premise");
    console.log(storyState.themeSelection, "theme");
    // console.log(props.storyCreated, 'storyCreated')
    // console.log(props.storyObj);
  };

  useEffect(() => {
    getThemes();
    console.log('use effect ran')
    const story = props.storyObj;
    //check if the object is empty by creating an array of the keys, and seeing if it has 0 elements in the array
    if (Object.keys(story).length === 0) {
      console.log("no story");
    } else {
      setStoryState({
        title: story.title,
        private: story.private,
        anonymous: story.anonymous,
        ripsAllowed: story.ripsAllowed,
        storyPremise: story.storyPremise,
        themeSelection: story.theme,
      });
    }
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
        {/* dropdown */}
        <div>
          <p>Choose the theme of your story</p>
          <select
            className="border-2 border-solid border-black"
            onChange={handleChange}
            name="themeSelection"
            value={storyState.themeSelection}
          >
            {allThemes.map((themeObj) => (
              <option key={themeObj._id} value={themeObj._id}>
                {themeObj.title}
              </option>
            ))}
          </select>
        </div>

        {/* private */}
        {/* radio buttons */}
        <div className="mb-5">
          <p>Do you want your story to be private?</p>
          <span>Yes</span>
          <input
            type="radio"
            name="private"
            onChange={handleRadioBoolChange}
            value="true"
            checked={storyState.private === true}
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
          <></>
        ) : (
          <div className="mb-5">
          <p>Do you want your story posted anonymously?</p>
          <span>Yes</span>
          <input
            type="radio"
            name="anonymous"
            onChange={handleRadioBoolChange}
            value="true"
            checked={storyState.anonymous === true}
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
        )}

        {/* rips allowed */}
        <div>
          <p>How many mistakes can someone make before they fail?</p>
          <input
            type="number"
            name="ripsAllowed"
            value={storyState.ripsAllowed}
            onChange={handleChange}
            className="border-2 border-solid border-black"
          />
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

        {/* Submit Story */}
        <div>
          <button>Create Pages</button>
        </div>
      </form>
    </>
  );
};

export default CreateStory;
