const mongoose = require("mongoose");
const conn = async () => {
  try {
    await mongoose.connect(`${process.env.URI}`);
    console.log("Connected to Mongo");
  } catch (err) {
    console.log(err);
  }
};

conn();
