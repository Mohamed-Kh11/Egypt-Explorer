import express from "express";
import Hotel from "../../models/Hotel.js";

const router = express.Router();

// @desc   Get all hotels
// @route  GET /api/hotels
router.get("/", async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch hotels" });
  }
});

// @desc   Get single hotel by ID
// @route  GET /api/hotels/:id
router.get("/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ error: "Hotel not found" });
    res.json(hotel);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch hotel" });
  }
});

// @desc   Create a new hotel
// @route  POST /api/hotels
router.post("/", async (req, res) => {
  try {
    const hotel = new Hotel(req.body); // ✅ imageUrl is included automatically
    await hotel.save();
    res.status(201).json(hotel);
  } catch (err) {
    res.status(400).json({ error: "Failed to create hotel" });
  }
});

// @desc   Update a hotel
// @route  PUT /api/hotels/:id
router.put("/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!hotel) return res.status(404).json({ error: "Hotel not found" });
    res.json(hotel);
  } catch (err) {
    res.status(400).json({ error: "Failed to update hotel" });
  }
});

// @desc   Delete a hotel
// @route  DELETE /api/hotels/:id
router.delete("/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) return res.status(404).json({ error: "Hotel not found" });
    res.json({ message: "Hotel deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete hotel" });
  }
});

export default router;
