import "./hotelsearch.css";
import { getAllHotels } from "@/lib/api";
import { Button } from "@nextui-org/button";
import SelectComponent from "./selectcomponent";

export default async function Hotelsearch() {
  const hotels = await getAllHotels(false);

  return (
    <section className="hotelsearch-component pb-8 mb-16">
      <div className="container mx-auto px-5 flex flex-col justify-end h-full">
        <h1
          className="text-2xl md:text-3xl font-bold tracking-tighter leading-tight text-center md:pr-8 text-white"
          style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)" }}
        >
          Find your dreamy destination
        </h1>
        <div className="bg-white p-10 border mt-8 flex items-center justify-center">
          <div className="flex items-center justify-center w-4/6 text-center">
            <SelectComponent hotels={hotels} />

            <Button color="primary" variant="solid">
              Find hotel
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
