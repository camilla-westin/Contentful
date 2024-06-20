import { getLandingPage } from "@/lib/api";
import CarouselComponent from "@/app/components/carousel/carousel";
import { draftMode } from "next/headers";
import Teaser from "../components/Teaser/teaser";

export default async function LandingPage({
  params,
}: {
  params: { slug: string };
}) {
  const { isEnabled } = draftMode();
  const { landingpage } = await getLandingPage(params.slug, isEnabled);

  return (
    <div className="container mx-auto px-5">
      <h1 className="mb-12 text-center text-5xl font-bold leading-tight tracking-tighter md:text-left md:text-6xl md:leading-none lg:text-7xl">
        {landingpage.heading}
      </h1>
      {landingpage.modulesCollection.items.map((module: any, index: number) => {
        if (module.__typename === "ImageCarousel") {
          return (
            <CarouselComponent
              key={index}
              moreImages={module.imagesCollection}
            />
          );
        }
        if (module.__typename === "Post") {
          return <Teaser content={module} />;
        }
        return null;
      })}
    </div>
  );
}
