const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const dotenv = require("dotenv");
const cors = require("cors");

//PORT
const PORT = process.env.PORT || 3010;

//import middleware
const authMiddleware = require("./resources/middleware/auth.middleware");

// import routes
const authRoute = require("./resources/routers/auth.route");
const filterRoute = require("./resources/routers/filter.route");
const addressRoute = require("./resources/routers/address.route");
const collectionRoute = require("./resources/routers/collection.route");
const shareLocationRoute = require("./resources/routers/shareLocation.route");
const cafeRoute = require("./resources/routers/cafe.route");
const imageRoute = require("./resources/routers/image.route");
const likeCafeRoute = require("./resources/routers/like_cafe.route");
const commentRoute = require("./resources/routers/comment.route");
const likeCommentRoute = require("./resources/routers/like_comment.route");
const dislikeCommentRoute = require("./resources/routers/dislike_comment.route");
const bookmarkRoute = require("./resources/routers/bookmark.route");

dotenv.config();

app.use(cors());

// databae
const db = require("./config/database/database.config");
db.connect();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// use routes
app.use("/auth", authRoute);
app.use("/", filterRoute);
app.use("/address", addressRoute);
app.use("/collection", authMiddleware.isUser, collectionRoute);
app.use("/share-location", shareLocationRoute);
app.use("/cafe", cafeRoute);
app.use("/upload-image", imageRoute);
app.use("/like-cafe", authMiddleware.isOptionLogin, likeCafeRoute);
app.use("/comment", commentRoute);
app.use("/like-comment", likeCommentRoute);
app.use("/dislike-comment", dislikeCommentRoute);
app.use("/bookmark", authMiddleware.isOptionLogin, bookmarkRoute);

server.listen(PORT, (req, res) => {
  console.log(`listening http://localhost:${PORT}`);
});
