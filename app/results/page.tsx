"use client";
import { getAllHotels } from "@/lib/api";
import { useSearchParams } from "next/navigation";
import HotelCard from "../components/hotel-card";

export default async function ResultsPage() {
  const searchParams = useSearchParams();
  const selected = searchParams.get("selected");
  const hotels = (await getAllHotels(false)) || [];

  return (
    <div className="container mx-auto px-5">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight py-4 md:pr-8">
        Results Page
      </h1>
      <p>Selected: {selected}</p>
      {hotels
        .filter((hotel) => hotel.country.title === selected)
        .map((hotel) => (
          <HotelCard hotel={hotel} key={hotel.id} />
        ))}

      {/* TODO: Man kan inte ha async i en client-funktion. */}
    </div>
  );
}
