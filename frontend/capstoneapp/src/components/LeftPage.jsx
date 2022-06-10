import { useState, useGlobal, useEffect } from "reactn";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";

const LeftPage = (props) => {
  //props used: currentPage, hasChosen, and judgeAnswer
  //  note: on the component- don't always have option 1 at the top; the player might always write their good option on top, or vice versa, so randomizing the two will keep it fun

  return (
    <>
      <div className="w-[31rem] absolute left-[25.5rem] top-16 -skew-y-1 -rotate-1 mr-5 px-5">
        <p className="mb-3"> The situation: {props.currentPage.body}</p>
        <p className="ml-48">~choose~</p>
        <button
          disabled={props.hasChosen === true}
          onClick={() => props.judgeAnswer(1)}
          className={props.hasChosen === true ? "bg-red" : "hover:font-bold"}
        >
          - {props.currentPage.optionOne}
        </button>
        <p>
          <button
            disabled={props.hasChosen === true}
            onClick={() => props.judgeAnswer(2)}
            className={props.hasChosen === true ? "bg-red" : "hover:font-bold"}
          >
            - {props.currentPage.optionTwo}
          </button>
        </p>
      </div>
      <p className="absolute left-[40rem] bottom-[8rem] -rotate-1 -skew-y-1">
        Page {props.counter}
      </p>
    </>
  );
};

export default LeftPage;
