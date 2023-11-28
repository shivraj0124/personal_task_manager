const express = require("express");
const db = require('./db')
const app = express();
const PORT = 5000;
const tasks=require('./Routes/tasks')
const cors=require("cors")
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET", "DELETE", "PUT", "HEAD", "PATCH"],
    credentials: true,
    optionSuccessStatus: 200,
  })
);


db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

app.use('/api',tasks)


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
