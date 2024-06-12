import Link from "next/link";
import Avatar from "./avatar";
import DateComponent from "./date";
import CoverImage from "./cover-image";

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
    <div>
      <div className="mb-5">
        {postImage && (
          <CoverImage
            title={postImage.imageTitle}
            slug={slug}
            url={postImage.image.url}
            alttext={postImage.altText}
          />
        )}
      </div>
      <h3 className="text-2xl mb-3 leading-snug">
        <Link href={`/posts/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      <div className="text-sm mb-4">
        <DateComponent dateString={date} />
      </div>
      <p className="text-md leading-relaxed mb-4">{excerpt}</p>
      {author && <Avatar name={author.name} picture={author.picture} />}
    </div>
  );
}

export default function MoreStories({ morePosts }: { morePosts: any[] }) {
  return (
    <section>
      <h2 className="mb-6 text-2xl md:text-4xl font-bold tracking-tighter leading-tight">
        More Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-4 gap-y-20 md:gap-y-32 mb-32">
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
