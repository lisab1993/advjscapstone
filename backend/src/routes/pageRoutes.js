const {AsyncRouter: Router} = require("express-async-router")
const jwt = require("jsonwebtoken")
const Page = require('../models/Page')

const handleValidationErrors = require("../middleware/handleValidationErrors")
const jwtMiddleware = require("../middleware/jwtMiddleware")

const router = Router()

//Create
router.post("/", [jwtMiddleware, handleValidationErrors], async(req, res) => {
    console.log(req.body)
    const page = new Page(req.body)
    await page.save()
    res.send(page)
})

//Retrieve
router.get("/:id", async (req, res) => {
    const page = await Page.findOne({ _id: req.params.id });
    res.send(page);
  });

//Update
router.patch("/:id", [handleValidationErrors, jwtMiddleware], async (req, res) => {
    const page = await Page.findOne({ _id: req.params.id });
    if (!page) {
      res.status(404).send("unable to find and update this page!");
    } else {
      const pageData = req.body;
      page.set(pageData);
      await page.save();
      res.send(page);
    }
  });

//Delete
router.delete("/:id", [jwtMiddleware, handleValidationErrors], async (req, res) => {
    const page = await Page.findOne({ _id: req.params.id });
    if (!page) {
      res.status(404).send("oops, this page can't be found!");
    } 
    else {
      await page.remove();
      res.send(page);
    }
  });

//List
router.get("/", async (req, res) => {
    const pages = await Page.find();
    res.send(pages);
  });

module.exports = router


