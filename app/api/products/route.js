import { getPlaiceholder } from "plaiceholder";

const PRODUCTS = [
  {
    _id: "1",
    name: "Rich Dad Poor Dad",
    description: "A classic personal finance book",
    category: "Books",
    price: 15,
    image: "https://via.placeholder.com/300x200?text=Rich+Dad",
  },
  {
    _id: "2",
    name: "Nike Air Max",
    description: "Comfortable running shoes",
    category: "Fashion",
    price: 120,
    image: "https://i.ibb.co/HDGyB9Jf/image.jpg",
  },
];

export async function GET(req) {
  const productsWithPlaceholder = await Promise.all(
    PRODUCTS.map(async (product) => {
      const { base64 } = await getPlaiceholder(product.image);
      return { ...product, blurDataURL: base64 };
    })
  );

  return new Response(
    JSON.stringify({ success: true, products: productsWithPlaceholder }),
    { status: 200 }
  );
}
