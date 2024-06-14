"use client";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./carousel.css";

interface CarouselComponentProps {
  defaultImage: {
    image: {
      url: string;
    };
    altText: string;
  };
  moreImages: {
    imagesCollection: {
      items: {
        image: {
          url: string;
        };
      }[];
    };
  };
}

export default function CarouselComponent({
  defaultImage,
  moreImages,
}: CarouselComponentProps) {
  return (
    <Carousel>
      {defaultImage && (
        <div className="slide">
          <img
            alt={defaultImage.altText}
            src={`${defaultImage.image.url}?fit=fill&w=1200&h=700&f=center`}
            key="default"
          />
        </div>
      )}

      {moreImages &&
        moreImages.imagesCollection.items.map((imageItem, index) => (
          <div className="slide" key={index}>
            <img
              alt="sample_file"
              src={`${imageItem.image.url}?fit=fill&w=1200&h=700&f=center`}
            />
          </div>
        ))}
    </Carousel>
  );
}
