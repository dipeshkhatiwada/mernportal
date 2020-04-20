require("dotenv").config();
const mongoose = require('mongoose');
const express = require("express");
const app = express();
const fileUpload = require('express-fileupload');
// default options
app.use(fileUpload());

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// requiring  for route
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const postRoutes = require("./routes/post");

// connetion
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
.then(() => {
    console.log("DB CONNECTED");
});

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// My Routes
app.use("/api", authRoutes)
app.use("/api", userRoutes)
app.use("/api", categoryRoutes)
app.use("/api", postRoutes)


// port
const port = process.env.PORT || 8000;
// stating server
app.listen(port, () => {
    console.log(`app is running at  http://127.0.0.1:${port}/`);
})