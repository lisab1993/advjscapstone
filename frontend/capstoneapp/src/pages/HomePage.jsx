import {Link} from "react-router-dom"
import LogoutButton from "../components/LogoutButton"

const HomePage = () => {
  return (
    <div>HomePage
      <Link to="/game" >Quick Start</Link>
    </div>
  )
}

export default HomePage