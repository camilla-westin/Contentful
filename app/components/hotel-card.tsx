"use client";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

interface Hotel {
  hotelName: string;
  slug?: string;
  coverImage: { url: string };
  defaultImage: {
    imageTitle: string;
    image: { url: string };
    altText: string;
  };
  pricePerNight: number;
  city: { cityName: string };
  country: { title: string };
}

export default function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">
          {hotel.city.cityName}, {hotel.country.title}
        </p>
        <small className="text-default-500">
          {" "}
          ${hotel.pricePerNight} / per night
        </small>
        <h2 className="font-bold text-large">{hotel.hotelName}</h2>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        {hotel.defaultImage && (
          <Image
            src={`${hotel.defaultImage.image.url}?fit=fill&w=460&h=300&f=center`}
            alt={hotel.defaultImage.altText}
          />
        )}
      </CardBody>
    </Card>
  );
}
