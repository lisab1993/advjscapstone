import Navbar from "./Navbar"

const WinningScreen = (props) => {
  return (
    <div
    className="h-screen bg-cover bg-no-repeat flex-auto "
    style={{ backgroundImage: `url(${props.theme.winningBackground})` }}
  >
    <Navbar />
    <div className="bg-neutral-700 text-white w-[35rem] mx-auto mt-96 text-center pt-20 h-1/4 rounded-lg">
      <span className="text-2xl font-bold">You won!</span>
    </div>
  </div>
  )
}

export default WinningScreen