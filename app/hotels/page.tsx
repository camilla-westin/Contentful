import { getAllHotels } from "@/lib/api";
import HotelCard from "../components/hotel-card";

export default async function HotelsPage() {
  const hotels = await getAllHotels(false);

  return (
    <div className="container mx-auto px-5">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight py-4 md:pr-8">
        Hotels
      </h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {hotels.map((hotel) => (
          <HotelCard hotel={hotel} key={hotel.id} />
        ))}
      </div>
    </div>
  );
}
