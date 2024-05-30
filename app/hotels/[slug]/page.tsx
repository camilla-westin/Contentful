import Link from "next/link";
import { getAllHotels, getHotel } from "@/lib/api";
import CoverImage from "../../components/cover-image";
import { draftMode } from "next/headers";
import { Markdown } from "@/lib/markdown";

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
      <div className="py-5">
        <Link href="/">Back</Link>
      </div>

      <div className="mb-8 sm:mx-0 md:mb-16">
        <CoverImage title={hotel.hotelName} url={hotel.coverImage.url} />
      </div>
      <div className="flex">
        <div className="w-8/12 pr-20">
          <h1 className="mb-12 text-center text-5xl font-bold leading-tight tracking-tighter md:text-left md:text-6xl md:leading-none lg:text-7xl">
            {hotel.hotelName}
          </h1>
          <div>
            <Markdown content={hotel.description} />
          </div>
        </div>
        <aside className="w-4/12">
          <div>
            {hotel.city.cityName}, {hotel.country.title}
          </div>
          <div>${hotel.pricePerNight} / per night</div>
          <div>{hotel.starRating}</div>
        </aside>
      </div>
    </div>
  );
}
