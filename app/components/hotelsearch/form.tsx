"use client";
import { Select, SelectItem, Selection } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Hotel {
  sys: {
    id: string;
  };
  country: {
    title: string;
  };
}

interface Hotels extends Array<Hotel> {}

export default function FormComponent({ hotels }: { hotels: Hotels }) {
  const router = useRouter();
  const [selectValue, setSelectValue] = useState<Selection>(new Set([]));

  function handleSearchClick() {
    const selectedValuesArray = Array.from(selectValue);
    const queryString = selectedValuesArray.join(",");
    router.push(`/results?selected=${encodeURIComponent(queryString)}`);

    //TODO: Nästa steg, ta emot dessa parametrar på resultssidan
  }

  return (
    <>
      <Select
        label="Destination"
        placeholder="Enter your destination"
        selectionMode="multiple"
        className="max-w-xs"
        selectedKeys={selectValue}
        onSelectionChange={setSelectValue}
      >
        {hotels
          .filter(
            (hotel, index, self) =>
              self.findIndex((h) => h.country.title === hotel.country.title) ===
              index
          )
          .map((hotel) => (
            <SelectItem key={hotel.country.title}>
              {hotel.country.title}
            </SelectItem>
          ))}
      </Select>
      <Button color="primary" variant="solid" onPress={handleSearchClick}>
        Find hotel
      </Button>
    </>
  );
}
