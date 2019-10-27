// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const DataSchema = new Schema(
  {
    Date: String,
    Open: String,
    Close: String,
    High: String,
    Low: String,
    Volume: String,
    Symbol: String
  }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Stock", DataSchema);