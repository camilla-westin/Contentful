import { getAllHotels } from "@/lib/api";
import HotelCard from "../components/hotel-card";

export default async function HotelsPage() {
  const hotels = await getAllHotels(false);

  return (
    <div className="container mx-auto px-5">
      <h1>Hotels</h1>
      <div className="flex">
        {hotels.map((hotel) => (
          <HotelCard hotel={hotel} key={hotel.id} />
        ))}
      </div>
    </div>
  );
}
