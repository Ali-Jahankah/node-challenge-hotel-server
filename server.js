const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
let allData = [
  {
    id: 1,
    title: "Mr",
    firstName: "Jimi",
    surname: "Hendrix",
    email: "jimi@example.com",
    roomId: 2,
    checkInDate: "2017-11-21",
    checkOutDate: "2017-11-23",
  },
  {
    id: 2,
    title: "King",
    firstName: "James",
    surname: "Brown",
    email: "jamesbrown@example.com",
    roomId: 1,
    checkInDate: "2018-02-15",
    checkOutDate: "2018-02-28",
  },
  {
    id: 3,
    title: "Queen",
    firstName: "Aretha",
    surname: "Franklin",
    email: "aretha@example.com",
    roomId: 5,
    checkInDate: "2018-03-01",
    checkOutDate: "2018-04-09",
  },
  {
    id: 4,
    title: "Mr",
    firstName: "Stevie",
    surname: "Wonder",
    email: "stevie@example.com",
    roomId: 6,
    checkInDate: "2017-12-25",
    checkOutDate: "2018-01-03",
  },
  {
    id: 5,
    title: "Mr",
    firstName: "John",
    surname: "Lennon",
    email: "lennon@example.com",
    roomId: 3,
    checkInDate: "2017-08-30",
    checkOutDate: "2017-10-02",
  },
];

//Use this array as your (in-memory) data store.

app.get("/", function (request, response) {
  response.send("Hotel booking server.  Ask for /bookings, etc.");
});
app.get("/bookings", (req, res) => {
  res.status(201).json(allData);
});
app.post("/bookings", (req, res) => {
  const { body } = req;

  if (body) {
    body.id = uuidv4();
    allData.push(body);
    res.status(201).send(allData);
  }
});
app.get("/bookings/:bookingId", (req, res) => {
  const { bookingId } = req.params;
  const found = allData.find((item) => item.id == bookingId);
  if (found) {
    res.status(201).json(found);
  } else {
    res.status(404).json({ message: "Sorry user not found" });
  }
});
app.delete("/bookings/:deleteId", (req, res) => {
  const { deleteId } = req.params;
  const found = allData.find((item) => item.id == deleteId);
  if (found) {
    allData = allData.filter((item) => item.id != deleteId);
    res.status(201).json(allData);
  } else {
    res.status(404).json({ message: "User not found to delete! :(" });
  }
});
app.put("/bookings/:updateId", (req, res) => {
  const { updateId } = req.params;
  const updatedUser = req.body;
  let foundIndex = allData.findIndex((item) => item.id == updateId);
  console.log(foundIndex);
  if (Number(foundIndex) === foundIndex) {
    console.log(allData[foundIndex]);
    allData[foundIndex] = updatedUser;
    allData[foundIndex].id = updateId;
    console.log(allData[foundIndex].id);
    res.json(allData);
  } else {
    res.status(404).json({ message: "User not found! :(" });
  }
});
// TODO add your routes and helper functions here

const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
