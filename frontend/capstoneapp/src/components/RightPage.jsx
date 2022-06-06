
const RightPage = (props) => {
  //props used: selectionRes and upCounter
  
  return (
    <>
    <p className="absolute w-[31rem] right-[25.5rem] skew-y-1 rotate-1 px-5 top-16">
      {props.selectionRes}
    </p>
    <button
      className="hover:font-bold absolute right-[40rem] bottom-[8rem] rotate-1 skey-y-1"
      onClick={props.upCounter}
    >
      Next Page
    </button>
  </>
  )
}

export default RightPage