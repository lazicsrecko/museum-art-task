const express = require("express");
const fs = require("fs");

// Reading JSON files

let tree, collection;

// Read tree.json
fs.readFile("./tree.json", (err, data) => {
  if (err) {
    throw err;
  }
  tree = JSON.parse(data);
});

//Read collection.json
fs.readFile("./collection.json", (err, data) => {
  if (err) {
    throw err;
  }
  const rawData = JSON.parse(data);
  collection = rawData.collection;
});

const PORT = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => {
  res.status(200).send(tree);
});

app.get("/collection/:id", (req, res) => {
  try {
    const { id } = req.params;
    const item = collection.filter(i => id === i.id);
    
    res.status(200).send(item);
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
