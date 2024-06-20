import DateComponent from "../date";
import Link from "next/link";

interface TeaserProps {
  content: {
    title: string;
    slug: string;
    date: string;
    excerpt: string;
    postImage?: {
      image: {
        url: string;
      };
      altText: string;
    };
  };
}

export default function Teaser({ content }: TeaserProps) {
  return (
    <article className="teaser flex py-16">
      {content.postImage && (
        <img
          src={`${content.postImage?.image.url}?fit=fill&w=600&h=400&f=center`}
          alt={content.postImage?.altText}
        />
      )}
      <div className="pl-8">
        <p className="text-tiny uppercase font-bold mb-1">
          <DateComponent dateString={content.date} />
        </p>
        <h2 className="mb-4 text-2xl lg:text-4xl leading-tight">
          <Link href={`/posts/${content.slug}`} className="hover:underline">
            {content.title}
          </Link>
        </h2>
        <p>{content.excerpt}</p>
      </div>
    </article>
  );
}
