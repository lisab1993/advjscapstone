
//The Idea--------------------------
//One base game anyone can play without logging in
//Authenticated users can create their own stories, and either make them private or share them
//Each page will have a scenario and two choices. 
//A wrong choice rips a page
//Too many ripped pages ends the story
//A user can have only a certain amount of ripped pages allowed, and the number allowed varies from story to story


//Models--------------------------
//Story
// title -string
// author -object id
// private or not -boolean
// ripped pages allowed -number
// story premise -string
// theme -object id

//Page
// tpageNumber: number
// story: object id
// body: string
// option 1: string
// option 2: string

//one of these is the correct answer, the other rips a page. If the boolean is true, it's a ripped page
// option 1 impact: boolean
//option 2 impact: boolean

//Theme
// (ocean, medieval, space, post-apocalyptic)
// title -string
// background image - image
// book image - image
// page image - image
// winning background - image
// losing background -image

//User
// username
// password


// {rips > 0 && counter <= pageCount && (
//     <div
//       className="bg-cover bg-no-repeat h-screen flex-auto relative"
//       style={{ backgroundImage: `url(${theme.backgroundImage})` }}
//     >
//       <Navbar />
//       {/* book image */}
//       <p className="absolute">
//         <img src={theme.bookImage} className="w-7/12 mx-auto" />
//       </p>

//       {/* left page */}
//       <div className="w-[31rem] absolute left-[25.5rem] top-16 -skew-y-2 mr-5 px-5">
//         <p className="mb-3"> The situation: {currentPage.body}</p>
//         <p className="ml-56">~choose~</p>
//         <button
//           disabled={hasChosen === true}
//           onClick={() => judgeAnswer(1)}
//           className={hasChosen === true ? "bg-red" : "hover:font-bold"}
//         >
//           - {currentPage.optionOne}
//         </button>
//         <p>
//           <button
//             disabled={hasChosen === true}
//             onClick={() => judgeAnswer(2)}
//             className={hasChosen === true ? "bg-red" : "hover:font-bold"}
//           >
//             - {currentPage.optionTwo}
//           </button>
//         </p>
//       </div>
//       {/* page number */}
//       <p className="absolute left-[40rem] bottom-[8rem] -skew-y-3">
//         Page {currentPage.pageNumber}
//       </p>
//       {/* results on right of page */}
//       {hasChosen === true && (
//         <>
//           <p className="absolute w-[31rem] right-[25.5rem] skew-y-1 px-5 top-16">
//             {selectionRes}
//           </p>
//           <button
//             className="hover:font-bold absolute right-[40rem] bottom-[8rem] skey-y-1"
//             onClick={upCounter}
//           >
//             Next Page
//           </button>
//         </>
//       )}
//     </div>
//   )}