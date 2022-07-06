const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const uri =
  "mongodb+srv://JosephKorel:Etchepare357$&&@easystudy.vdsha.mongodb.net/?retryWrites=true&w=majority";
const app = express();
const client = new MongoClient(uri);
const mongoose = require("mongoose");
const multer = require("multer");
const userModel = require("./models/image");
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://JosephKorel:Etchepare357$&&@easystudy.vdsha.mongodb.net/users?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Db connected"))
  .catch((err) => console.log(err));

const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
}).single("image");

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      const newImg = new userModel({
        username,
        password,
        profileImage: { data: req.file.filename, contentType: "image/png" },
      });
      newImg
        .save()
        .then(() => console.log("success"))
        .catch((err) => console.log(err));
    }
  });
});

app.post("/register", async (req, res) => {
  const userData = req.body;
  await client.connect();
  const database = client.db("users");
  const userinfos = database.collection("userinfos");
  userinfos
    .insertOne(userData)
    .then((response) => {
      res.send("Success");
    })
    .catch((error) => res.send(error));
});

app.post("/addDoc", async (req, res) => {
  const { user, title, content, docTag, date } = req.body;
  await client.connect();
  const database = client.db("resumes");
  const userColl = database.collection(user);
  const doc = { title, content, docTag, date };
  const result = await userColl.insertOne(doc);
  try {
    res.send(result);
  } catch (error) {
    res.sendStatus(400).json({ error });
  }
});

app.listen(5000, () => console.log("Running on 5000"));
