const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const TodoTask = require("./models/todotask")

require("dotenv").config()
const PORT = 8000

// Middleware
app.set("view engine", "ejs")
//grabs style sheets from public folder
app.use(express.static("public"))
//helps validate info sent back and forth
app.use(express.urlencoded({ extended: true }))
//why not use cors
app.use(cors())

// connect to Mongo
mongoose.connect(process.env.DB_Key, { useNewUrlParser: true }, () => {
  console.log("Connected to db!")
})

// GET Method
app.get("/", async (req, res) => {
  try {
    TodoTask.find({}, (err, tasks) => {
      res.render("index.ejs", { todoTasks: tasks })
    })
  } catch (err) {
    if (err) return res.status(500).send(err)
  }
})

// POST Method
app.post("/", async (req, res) => {
  const todoTask = new TodoTask({
    title: req.body.title,
    content: req.body.content,
  })
  try {
    await todoTask.save()
    console.log(todoTask)
    res.redirect("/")
  } catch (err) {
    if (err) return res.status(500).send(err)
    res.redirect("/")
  }
})

//UPDATE METHOD
app
  .route("/edit/:id")
  .get((req, res) => {
    const id = req.params.id
    TodoTask.find({}, (err, tasks) => {
      res.render("edit.ejs", { todoTasks: tasks, idTask: id })
    })
  })
  .post((req, res) => {
    const id = req.params.id
    TodoTask.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
        content: req.body.content,
      },

      (err) => {
        if (err) return res.status(500).send(err)
        res.redirect("/")
      }
    )
  })

//DELETE
app.route("/remove/:id").get((req, res) => {
  const id = req.params.id
  TodoTask.findByIdAndRemove(id, (err) => {
    if (err) return res.send(500, err)
    res.redirect("/")
  })
})

// Start Server
app.listen(PORT || PORT, () => console.log(`Server is running!`))
