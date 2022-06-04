import Navbar from "./Navbar"

const LosingScreen = (props) => {
  return (
    <div
    className="h-screen bg-cover bg-no-repeat flex-auto "
    style={{ backgroundImage: `url(${props.theme.losingBackground})` }}
  >
    <Navbar />
    <div className="bg-neutral-700 text-white w-[35rem] mx-auto mt-96 text-center pt-20 h-1/4 rounded-lg">
      <span className="text-2xl font-bold">Sorry, you lose</span>
    </div>
  </div>
  )
}

export default LosingScreen