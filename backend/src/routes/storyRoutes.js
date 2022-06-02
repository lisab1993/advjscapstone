const {AsyncRouter: Router} = require("express-async-router")
const jwt = require("jsonwebtoken")
const Story = require('../models/Story')

const handleValidationErrors = require("../middleware/handleValidationErrors")
const jwtMiddleware = require("../middleware/jwtMiddleware")

const router = Router()

//Create
router.post("/", [jwtMiddleware, handleValidationErrors], async(req, res) => {
    console.log(req.body)
    const story = new Story(req.body)
    await story.save()
    res.send(story)
})

//Retrieve
router.get("/:id", async (req, res) => {
    const story = await Story.findOne({ _id: req.params.id }).populate({path: "pages"});
    res.send(story);
  });

//Update
router.patch("/:id", [handleValidationErrors, jwtMiddleware], async (req, res) => {
    const story = await Story.findOne({ _id: req.params.id });
    if (!story) {
      res.status(404).send("unable to find and update this story!");
    } else {
      const storyData = req.body;
      story.set(storyData);
      await story.save();
      res.send(story);
    }
  });

//Delete
router.delete("/:id", [jwtMiddleware, handleValidationErrors], async (req, res) => {
    const story = await Story.findOne({ _id: req.params.id });
    if (!story) {
      res.status(404).send("oops, this story can't be found!");
    } 
    else if (story.author.toString() !== req.user._id.toString()) {
      res.status(403).send("you can't delete stories you didn't create!");
    } 
    else {
      await story.remove();
      res.send(story);
    }
  });

//List
router.get("/", async (req, res) => {
    const stories = await Story.find().populate({path: "pages"});
    res.send(stories);
  });

module.exports = router