"use client";
import {
  Card,
  Heading,
  CardBody,
  Stack,
  Image,
  Text,
  CardFooter,
  Divider,
} from "@chakra-ui/react";
import Link from "next/link";

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
    <Card maxW="sm">
      <Link href={`/hotels/${hotel.slug}`}>
        <CardBody>
          {hotel.defaultImage && (
            <Image
              src={hotel.defaultImage.image.url}
              alt={hotel.defaultImage.altText}
              borderRadius="sm"
              boxSize="350px"
              objectFit="cover"
              height="200px"
            />
          )}
          <Stack mt="6" spacing="3">
            <Heading size="md">{hotel.hotelName}</Heading>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <Text color="blue.600" fontSize="md">
            {hotel.city.cityName}, {hotel.country.title}
          </Text>
          <Text color="blue.600" fontSize="md">
            ${hotel.pricePerNight} / per night
          </Text>
        </CardFooter>
      </Link>
    </Card>
  );
}
