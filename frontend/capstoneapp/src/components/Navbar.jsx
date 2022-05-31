import { Link } from "react-router-dom"
import { useGlobal } from "reactn"

import LogoutButton from "./LogoutButton"


const Navbar = () => {
  const [user, setUser] = useGlobal("user")

  return (
    <nav className="flex justify-evenly">
      <Link to="/">Home</Link>
        {!user && <>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </>}
        {user && <LogoutButton to="/">Logout</LogoutButton>}
      
    </nav>
  )
}

export default Navbar