const express = require('express')
const app = express()
const mongooseConnection = require("./src/db/mongoose");
const userRouter = require("./src/routes/users")
const postRouter = require("./src/routes/posts")
const commentRouter = require("./src/routes/comments")
require("dotenv").config();
const port = process.env.PORT || 9900

app.get('/', (req, res) => {
  res.send('Hello World!')
})

mongooseConnection();



app.use(express.json());
app.use("/users", userRouter)
app.use("/posts", postRouter)
app.use("/comments", commentRouter)


app.listen(port, () => {
  console.log(`Blog app listening at http://localhost:${port}`)
})