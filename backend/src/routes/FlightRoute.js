import express from "express";
import Flight from "../../models/Flight.js"; 

const router = express.Router();


// ✅ GET all flights
router.get("/", async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (err) {
    res.status(500).json({ message: "Error fetching flights", error: err.message });
  }
});


// ✅ CREATE a new flight
router.post("/", async (req, res) => {
  try {
    const {
      flightNumber,
      departureCity,
      departureAirport,
      arrivalCity,
      arrivalAirport,
      departureTime,
      arrivalTime,
      duration,
      price,
      airline,
      seatsAvailable,
      cabinClass,
      status
    } = req.body;

    // Basic validation
    if (!flightNumber || !departureCity || !departureAirport || !arrivalCity || !arrivalAirport || !departureTime || !arrivalTime || !price || !airline) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newFlight = new Flight({
      flightNumber,
      departureCity,
      departureAirport,
      arrivalCity,
      arrivalAirport,
      departureTime,
      arrivalTime,
      duration,
      price,
      airline,
      seatsAvailable,
      cabinClass,
      status
    });

    await newFlight.save();

    res.status(201).json({
      message: "Flight created successfully",
      flight: newFlight
    });
  } catch (err) {
    res.status(500).json({ message: "Error creating flight", error: err.message });
  }
});


// ✅ GET a single flight by ID
router.get("/:id", async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }
    res.json(flight);
  } catch (err) {
    res.status(500).json({ message: "Error fetching flight", error: err.message });
  }
});


// ✅ UPDATE a flight by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedFlight = await Flight.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedFlight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    res.json({
      message: "Flight updated successfully",
      flight: updatedFlight
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating flight", error: err.message });
  }
});


// ✅ DELETE a flight by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedFlight = await Flight.findByIdAndDelete(req.params.id);
    if (!deletedFlight) {
      return res.status(404).json({ message: "Flight not found" });
    }
    res.json({ message: "Flight deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting flight", error: err.message });
  }
});


export default router;
