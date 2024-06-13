import Link from "next/link";
import Avatar from "./avatar";
import DateComponent from "./date";
import CoverImage from "./cover-image";

import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

function PostPreview({
  title,
  postImage,
  date,
  excerpt,
  author,
  slug,
}: {
  title: string;
  postImage: any;
  date: string;
  excerpt: string;
  author: any;
  slug: string;
}) {
  return (
    <Card className="py-4 hover:border">
      <Link href={`/posts/${slug}`}>
        <CardHeader className="pb-0 pt-1 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold mb-1">
            <DateComponent dateString={date} />
          </p>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          {postImage && (
            <Image
              src={`${postImage.image.url}?fit=fill&w=460&h=300&f=center`}
              alt={postImage.altText}
            />
          )}
          <h2 className="mt-4 font-bold text-large"> {title}</h2>
          <p className="mt-1 text-sm">{excerpt}</p>
        </CardBody>
      </Link>
    </Card>
  );
}

export default function MoreStories({ morePosts }: { morePosts: any[] }) {
  return (
    <section>
      <h2 className="mb-6 text-2xl md:text-4xl font-bold tracking-tighter leading-tight">
        More Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-4 gap-y-20 md:gap-y-12 mb-12">
        {morePosts.slice(0, 3).map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            postImage={post.postImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  );
}
