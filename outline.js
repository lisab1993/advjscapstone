
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
// type: (start, end, story) -string
// story: object id
// body: string
// option 1: string
// option 1 health impact: number
// option 2: string
//option 2 health impact: number

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


