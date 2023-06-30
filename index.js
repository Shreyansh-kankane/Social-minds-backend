import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";

import { initFirebase } from "./firebase.js";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
const storage = getStorage();

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// /* FILE STORAGE */ at localStorage
// const storageEngine = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/assets");
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${file.originalname}`);
//   },
// });

const checkFileType = function (file, cb) {
  //Allowed file extensions
  const fileTypes = /jpeg|jpg|png|gif|svg|JPG/;

  //check extension names
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: You can Only Upload Images!!");
  }
};

// const upload = multer({
//   storage: storageEngine,
//   limits: { fileSize: 1000000 },
//   fileFilter: (req, file, cb) => {
//     checkFileType(file, cb);
//   },
// });

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"),
  async (req, res) => {
    try {
      const storageRef = ref(storage, `files/${req.file.originalname}`);
      // Create file metadata including the content type
      const metadata = {
        contentType: req.file.mimetype,
      };
      // Upload the file in the bucket storage
      const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
      //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

      // Grab the public url
      const downloadURL = await getDownloadURL(snapshot.ref);

      // console.log('File successfully uploaded.');
      // console.log(downloadURL);
      register(req, res, downloadURL);

    } catch (error) {
      return res.status(400).send(error.message)
    }
  }
);

app.post("/posts", verifyToken, upload.single("picture"),
  async (req, res) => {
    try {
      const storageRef = ref(storage, `posts/${req.file.originalname}`);
      // Create file metadata including the content type
      const metadata = {
        contentType: req.file.mimetype,
      };
      // Upload the file in the bucket storage
      const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
      //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

      // Grab the public url
      const downloadURL = await getDownloadURL(snapshot.ref);

      // console.log('File successfully uploaded.');
      // console.log(downloadURL);
      createPost(req, res, downloadURL);

    } catch (error) {
      return res.status(400).send(error.message)
    }
  }
);

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File size exceeds the allowed limit 5Mb' });
    }
  }
  next(err);
});

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("successfully connected");
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));


/* ADD DATA ONE TIME */
// User.insertMany(users);
// Post.insertMany(posts);
