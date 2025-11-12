import mongoose from "mongoose";

const flightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true, unique: true },
  departureCity: { type: String, required: true },
  departureAirport: { type: String, required: true },
  arrivalCity: { type: String, required: true },
  arrivalAirport: { type: String, required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  duration: { type: Number }, // in minutes
  price: { type: Number, required: true },
  airline: { type: String, required: true },
  seatsAvailable: { type: Number, default: 100 },
  cabinClass: { type: String, enum: ["Economy", "Business", "First"], default: "Economy" },
  status: { type: String, enum: ["Scheduled", "Delayed", "Cancelled"], default: "Scheduled" }
}, { timestamps: true });

export default mongoose.models.Flight || mongoose.model("Flight", flightSchema);
