"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function FlightDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [flight, setFlight] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/flights/${id}`)
        .then((res) => res.json())
        .then((data) => setFlight(data))
        .catch((err) => console.error("Error loading flight:", err));
    }
  }, [id]);

  if (!flight) return <p className="p-10 text-gray-500">Loading flight...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
      <h1 className="text-2xl font-bold mb-4">Flight {flight.flightNumber}</h1>
      <p className="text-gray-600">
        {flight.departureCity} ({flight.departureAirport}) →{" "}
        {flight.arrivalCity} ({flight.arrivalAirport})
      </p>
      <p className="mt-2">
        Departure: {new Date(flight.departureTime).toLocaleString()}
      </p>
      <p>
        Arrival: {new Date(flight.arrivalTime).toLocaleString()}
      </p>
      <p className="mt-2 font-bold text-yellow-600">${flight.price}</p>
      <p className="text-gray-500">Airline: {flight.airline}</p>
      <p className="text-gray-500">Status: {flight.status}</p>

      <button
        onClick={() => router.push(`/checkout/${flight._id}`)}
        className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl font-semibold"
      >
        Proceed to Purchase
      </button>
    </div>
  );
}
