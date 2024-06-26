"use client";
import { Select, SelectItem } from "@nextui-org/react";

interface Hotel {
  sys: {
    id: string;
  };
  country: {
    title: string;
  };
}

interface Hotels extends Array<Hotel> {}

export default function SelectComponent({ hotels }: { hotels: Hotels }) {
  return (
    <Select
      label="Destination"
      placeholder="Enter your destination"
      selectionMode="multiple"
      className="max-w-xs"
    >
      {hotels
        .filter(
          (hotel, index, self) =>
            self.findIndex((h) => h.country.title === hotel.country.title) ===
            index
        )
        .map((hotel) => (
          <SelectItem key={hotel.sys.id}>{hotel.country.title}</SelectItem>
        ))}
    </Select>
  );
}
