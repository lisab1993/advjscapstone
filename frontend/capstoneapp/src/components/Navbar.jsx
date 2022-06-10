import { Link } from "react-router-dom";
import { useGlobal } from "reactn";

import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const [user, setUser] = useGlobal("user");

  return (
    <nav className="flex flex-row justify-around bg-black">
      <Link className="text-white my-auto" to="/">Home</Link>
      {!user && (
        <>
          <Link className="text-white" to="/signup">Signup</Link>
          <Link className="text-white" to="/login">Login</Link>
        </>
      )}
      {user && 
      <><LogoutButton to="/">Logout</LogoutButton>
      <Link className="text-white" to="/profile">Profile</Link>
      <Link className="text-white" to="/create">Create</Link>
      </>
      
      }
    </nav>
  );
};

export default Navbar;
