const mongoose = require("mongoose");
const mongoDB = process.env.MONGO_URL || process.env.MONGO_URI;

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error: "));
