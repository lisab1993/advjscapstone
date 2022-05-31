const {AsyncRouter: Router} = require("express-async-router")
const jwt = require("jsonwebtoken")
const Theme = require('../models/Theme')

const handleValidationErrors = require("../middleware/handleValidationErrors")
const jwtMiddleware = require("../middleware/jwtMiddleware")

const router = Router()

//Create
router.post("/", [jwtMiddleware, handleValidationErrors], async(req, res) => {
    console.log(req.body)
    const theme = new Theme(req.body)
    await theme.save()
    res.send(theme)
})

//Retrieve
router.get("/:id", async (req, res) => {
    const theme = await Theme.findOne({ _id: req.params.id });
    res.send(theme);
  });

//Update
router.patch("/:id", [handleValidationErrors, jwtMiddleware], async (req, res) => {
    const theme = await Theme.findOne({ _id: req.params.id });
    if (!theme) {
      res.status(404).send("unable to find and update this theme!");
    } else {
      const themeData = req.body;
      theme.set(themeData);
      await theme.save();
      res.send(theme);
    }
  });

//Delete
router.delete("/:id", [jwtMiddleware, handleValidationErrors], async (req, res) => {
    const theme = await Theme.findOne({ _id: req.params.id });
    if (!theme) {
      res.status(404).send("oops, this theme can't be found!");
    } 
    else {
      await theme.remove();
      res.send(theme);
    }
  });

//List
router.get("/", async (req, res) => {
    const themes = await Theme.find();
    res.send(themes);
  });

module.exports = router


