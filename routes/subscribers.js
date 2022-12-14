const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscriber");

// Getting All
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Getting One
router.get("/:id", getSubscriber, (req, res) => {
  res.json(res.subcriber);
});
// Creating One
router.post("/", async (req, res) => {
  const subscriber = new Subscriber({
    author: req.body.author,
    text: req.body.text,
  });

  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Updating One
router.patch("/:id", getSubscriber, async (req, res) => {
  if (req.body.author != null) {
    res.subcriber.author = req.body.author;
  }

  if (req.body.text != null) {
    console.log(req.body.text);
    res.subcriber.text = req.body.text;
  }
  try {
    const updatedSubscriber = await res.subcriber.save();
    res.json(updatedSubscriber);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});
// Deleting One
router.delete("/:id", getSubscriber, async (req, res) => {
  try {
    await res.subcriber.remove();
    res.json({ message: "Subscriber removed successfully!" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

async function getSubscriber(req, res, next) {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(req.params.id);
    if (subscriber === null) {
      return res.status(404).json({ message: "Cannot find subscriber" });
    }
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }

  res.subcriber = subscriber;
  next();
}

module.exports = router;
