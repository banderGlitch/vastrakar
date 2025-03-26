import axios from "axios";

const SHOPIFY_DOMAIN = process.env.SHOPIFY_DOMAIN;
const ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;

console.log("SHOPIFY_DOMAIN", SHOPIFY_DOMAIN);
console.log("ACCESS_TOKEN", ACCESS_TOKEN);

// Process the request
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const cursor = searchParams.get("cursor");

  const query = `
      {
        products(first: 20${cursor ? `, after: "${cursor}"` : ""}) {
          edges {
            cursor
            node {
              id
              title
              description
              images(first: 1) {
                edges {
                  node { url }
                }
              }
              variants(first: 10) {
                edges {
                  node {
                    price { amount, currencyCode }
                    title
                  }
                }
              }
              metafields(identifiers: [
                { namespace: "custom", key: "fabric" },
                { namespace: "custom", key: "work" },
                { namespace: "custom", key: "style" },
                { namespace: "custom", key: "badge" },
                { namespace: "custom", key: "rating" }
              ]) {
                key
                value
              }
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `;

  try {
    const response = await axios.post(
      `https://${SHOPIFY_DOMAIN}/api/2023-10/graphql.json`,
      { query },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": ACCESS_TOKEN,
        },
      }
    );

    const productEdges = response.data.data.products.edges;
    const pageInfo = response.data.data.products.pageInfo;

    const products = productEdges.map(({ node }) => {
      const metafields = Object.fromEntries(
        (node.metafields || [])
          .filter(Boolean)
          .map(({ key, value }) => [key, value])
      );

      return {
        id: node.id.replace("gid://shopify/Product/", ""),
        title: node.title,
        description: node.description,
        image: node.images.edges?.[0]?.node.url || "",
        price: node.variants.edges?.[0]?.node.price.amount || "",
        currency: node.variants.edges?.[0]?.node.price.currencyCode || "",
        sizes: node.variants.edges.map((v) => v.node.title),
        badge: metafields.badge || "",
        rating: metafields.rating ? JSON.parse(metafields.rating)[0] : null,
        work: metafields.work || "",
        style: metafields.style || "",
        fabric: metafields.fabric || "",
      };
    });

    return Response.json({
      products,
      endCursor: pageInfo.endCursor,
      hasNextPage: pageInfo.hasNextPage,
    });
  } catch (error) {
    console.error(
      "❌ Shopify API error:",
      error?.response?.data || error.message
    );
    return Response.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// Get product by id
export async function GETbyid(req, { params }) {
  const graphqlQuery = `
    query GetProductByID($id: ID!) {
   node(id: $id) {
    ... on Product {
      id
      title
      description
      images(first: 5) {
        edges {
          node {
            url
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            title
            price {
              amount
              currencyCode
            }
          }
        }
      }
      metafields(identifiers: [
        { namespace: "custom", key: "badge" },
        { namespace: "custom", key: "rating" },
        { namespace: "custom", key: "style" },
        { namespace: "custom", key: "fabric" },
        { namespace: "custom", key: "work" }
      ]) {
        key
        value
      }
    }
  }
}`;

  const id = params.id;
  const shopifyId = `gid://shopify/Product/${id}`;
  const query = `${graphqlQuery}`;

  const response = await axios.post(
    `https://${SHOPIFY_DOMAIN}/api/2023-10/graphql.json`,
    {
      query,
      variables: {
        id: shopifyId,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": ACCESS_TOKEN,
      },
    }
  );
  console.log("response--------->", response);
  const product = response.data.data.node;
  console.log("product--------->", product);
  return Response.json({ product });
}
