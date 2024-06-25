import { draftMode } from "next/headers";
import HotelSearch from "./components/hotelsearch/hotelsearch";
import MoreStories from "./components/more-stories";
import HeroPost from "./components/heropost";
import { getAllPosts } from "@/lib/api";

export default async function Page() {
  const { isEnabled } = draftMode();
  const allPosts = await getAllPosts(isEnabled);
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <>
      <HotelSearch />
      <div className="container mx-auto px-5">
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            postImage={heroPost.postImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}
        <MoreStories morePosts={morePosts} />
      </div>
    </>
  );
}
