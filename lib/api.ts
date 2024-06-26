async function fetchGraphQL(query: string, preview = false): Promise<any> {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      next: { tags: ["posts"] },
    }
  ).then((response) => response.json());
}

const POST_GRAPHQL_FIELDS = `
  __typename
  slug
  title
  postImage {
    imageTitle
    image {
      url
    }
    altText
  }
  date
  author {
    name
    picture {
      url
    }
  }
  excerpt
  content {
    json
    links {
      assets {
        block {
          sys {
            id
          }
          url
          description
        }
      }
    }
  }
`;

function extractPost(fetchResponse: any): any {
  return fetchResponse?.data?.postCollection?.items?.[0];
}

function extractPostEntries(fetchResponse: any): any[] {
  return fetchResponse?.data?.postCollection?.items;
}

export async function getPreviewPostBySlug(slug: string | null): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    true
  );
  return extractPost(entry);
}

export async function getAllPosts(isDraftMode: boolean): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      postCollection(
        where: { slug_exists: true }, 
        preview: ${isDraftMode ? "true" : "false"}) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    isDraftMode
  );
  return extractPostEntries(entries);
}

export async function getPostAndMorePosts(
  slug: string,
  preview: boolean
): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: ${
      preview ? "true" : "false"
    }, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${
      preview ? "true" : "false"
    }, limit: 2) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );
  return {
    post: extractPost(entry),
    morePosts: extractPostEntries(entries),
  };
}

const HOTEL_GRAPHQL_FIELDS = `
  sys { id }
  hotelName
  slug
  description {
    json
    links {
      assets {
        block {
          sys {
            id
          }
          url
          description
        }
      }
    }
  }
  defaultImage {
    imageTitle
    image {
      url
    }
    altText
  }
  carousel {
    internalName
    imagesCollection (limit: 5) {
      items {
        imageTitle
        image {
          url
        }
      }
    }	
  }
  country {
    title
  }
  city {
    cityName
  }
  pricePerNight
  starRating
`;

function extractHotel(fetchResponse: any): any {
  return fetchResponse?.data?.hotelCollection?.items?.[0];
}

function extractHotelEntries(fetchResponse: any): any[] {
  return fetchResponse?.data?.hotelCollection?.items;
}

export async function getPreviewHotelBySlug(slug: string | null): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      hotelCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${HOTEL_GRAPHQL_FIELDS}
        }
      }
    }`,
    true
  );
  return extractHotel(entry);
}

export async function getAllHotels(isDraftMode: boolean): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      hotelCollection(
        where: { slug_exists: true }, 
        preview: ${isDraftMode ? "true" : "false"}
       ) {
        items {
          sys { id }
          hotelName
          slug
          defaultImage {
            imageTitle
            image {
              url
            }
            altText
          }
          country {
            title
          }
          city {
            cityName
          }
          pricePerNight 
          starRating
        }
      }
    }`,
    isDraftMode
  );
  return extractHotelEntries(entries);
}

export async function getHotelAndMoreHotels(
  slug: string,
  preview: boolean
): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      hotelCollection(where: { slug: "${slug}" }, preview: ${
      preview ? "true" : "false"
    }, limit: 1) {
        items {
          ${HOTEL_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );
  const entries = await fetchGraphQL(
    `query {
      hotelCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${
      preview ? "true" : "false"
    }, limit: 2) {
        items {
          ${HOTEL_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );

  return {
    hotel: extractHotel(entry),
    moreHotels: extractHotelEntries(entries),
  };
}

export async function getHotel(slug: string, preview: boolean): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      hotelCollection(where: { slug: "${slug}" }, preview: ${
      preview ? "true" : "false"
    }, limit: 1) {
        items {
          ${HOTEL_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );

  return {
    hotel: extractHotel(entry),
  };
}

const LANDINGPAGE_GRAPHQL_FIELDS = `
 slug
 heading
 modulesCollection(limit: 10) {
    items {
      __typename
      ... on ImageCarousel {
        imagesCollection(limit: 10) {
          items {
            imageTitle
            image {
              url
            }
          }
        }
      }
      ... on Post {
        slug
        title
        date
        excerpt
        postImage {
          imageTitle
          image {
            url
          }
          altText
        }
      }
    }
  }
`;

function extractLandingPage(fetchResponse: any): any {
  return fetchResponse?.data?.landingPageCollection?.items?.[0];
}

export async function getPreviewLandingPageBySlug(
  slug: string | null
): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      landingPageCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          slug
          heading
        }
      }
    }`,
    true
  );
  return extractLandingPage(entry);
}

export async function getLandingPage(
  slug: string,
  preview: boolean
): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      landingPageCollection(
      where: { slug: "${slug}" }, 
      preview: ${preview ? "true" : "false"}, 
      limit: 1) 
      {
        items {
           ${LANDINGPAGE_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );

  return {
    landingpage: extractLandingPage(entry),
  };
}
