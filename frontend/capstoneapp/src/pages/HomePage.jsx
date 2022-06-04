import {Link} from "react-router-dom"
import QuickStartButton from "../components/QuickStartButton"
import Navbar from "../components/Navbar"
const HomePage = () => {

  return (
    <div>
      <Navbar />
      <QuickStartButton></QuickStartButton>
    </div>
  )
}

export default HomePage