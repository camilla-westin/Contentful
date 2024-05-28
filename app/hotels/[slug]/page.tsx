import Link from "next/link";
import { getAllHotels, getHotel } from "@/lib/api";
import CoverImage from "../../cover-image";
import { draftMode } from "next/headers";

export async function generateStaticParams() {
  const allHotels = await getAllHotels(false);

  return allHotels.map((hotel) => ({
    slug: hotel.slug,
  }));
}

export default async function HotelPage({
  params,
}: {
  params: { slug: string };
}) {
  const { isEnabled } = draftMode();
  const { hotel } = await getHotel(params.slug, isEnabled);

  return (
    <div className="container mx-auto px-5">
      <div className="mb-8 sm:mx-0 md:mb-16">
        <CoverImage title={hotel.hotelName} url={hotel.coverImage.url} />
      </div>
      <h1>{hotel.hotelName}</h1>
    </div>
  );
}
