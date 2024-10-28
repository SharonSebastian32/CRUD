import express from "express";
import morgan from "morgan";
const app = express();
const port = 3000;

app.use(morgan("dev"));
app.use(express.json());

let tData = [];
let nextId = 1;

// Add a tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  tData.push(newTea);
  res.status(201).send(newTea);
});

// Get all teas
app.get("/teas", (req, res) => {
  res.status(200).send(tData);
});

// Find tea by id
app.get("/teas/:id", (req, res) => {
  const teaId = parseInt(req.params.id);
  const tea = tData.find((t) => t.id === teaId);
  if (!tea) {
    return res.status(404).send("Tea Not Found");
  } else {
    res.status(200).send(tea);
  }
});

// update tea with id

app.put("/teas/:id", (req, res) => {
  const teaId = parseInt(req.params.id);
  const tea = tData.find((t) => t.id === teaId);

  if (!tea) {
    return res.status(404).send("Tea Not Found");
  }
  const { name, price } = req.body;
  tea.price = price;
  tea.name = name;
  res.status(200).send(tea);
});

// delete tea by id
app.delete("/teas/:id", (req, res) => {
  const index = tData.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("Tea not found");
  }
  tData.splice(index, 1);
  return res.status(200).send("delete successful");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
