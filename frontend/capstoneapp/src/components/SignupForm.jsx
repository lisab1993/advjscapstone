import { useState, useGlobal } from "reactn";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";

const SignupForm = () => {
  const [token, setToken] = useGlobal("token");
  const [user, setUser] = useGlobal("user")
  const [error, setError] = useState("");
  const [signedUp, setSignedUp] = useState(false);
  const [formState, setFormState] = useState({
    username: "",
    password: "",
    checkPassword: "",
  });

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async(event) => {
    event.preventDefault()
    try {
      await axios.post('http://localhost:1300/auth/signup', formState)
      const {data} = await axios.post('http://localhost:1300/auth/login', {
        username: formState.username,
        password: formState.password
      })
      setToken(data.token)
      setSignedUp(true)
      setUser(data.user)
    } catch(err) {
      setError('Invalid form data')
    }
  }

  return (
    <>
      {error && <div>{error}</div>}
      {signedUp && <Navigate replace to="/" />}
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={handleChange}
          value={formState.username}
          className="border-2 border-solid border-black"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
          value={formState.password}
          className="border-2 border-solid border-black"
        />
        <input
          type="password"
          name="checkPassword"
          placeholder="checkPassword"
          onChange={handleChange}
          value={formState.checkPassword}
          className="border-2 border-solid border-black"
        />
        <button className="border-2 border-solid border-black">Sign Up</button>
      </form>
      <div>Already have an account? Log in <Link to="/login">here</Link></div>
    </>
  );
};

export default SignupForm;
