import Container from "@/components/Container";
import { groq } from "next-sanity";
import { ProductData } from "../../../../../types";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { getBestSellersData } from "@/lib/getData";
import ProductCard from "@/components/ProductCard";
import { MdStar } from "react-icons/md";
import AddToCartButton from "@/components/AddToCartButton";

interface ProductPageProps {
  params: { slug: string };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug } = await Promise.resolve(params);
  const query = groq`*[_type == "product" && slug.current == $slug][0]{
  ...
}`;
  const product: ProductData = await client.fetch(query, { slug });
  const bestSellers: ProductData[] = await getBestSellersData();

  return (
    <Container className="my-8 bg-bgLight rounded-md">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full p-4 mb-10 md:mb-16">
        <div className="h-full xl:col-span-2">
          <Image
            src={urlFor(product?.image).url()}
            alt={product?.title}
            width={500}
            height={500}
            className="size-full object-contain rounded-md"
          />
        </div>

        <div className="w-full md:col-span-2 xl:col-span-3 xl:pl-14 flex flex-col gap-6 justify-center">
          <div className="flex flex-col gap-5">
            <h2 className="text-4xl font-semibold ">{product?.title}</h2>
            <div className="flex items-center gap-3">
              <p className="text-lg font-normal text-gray-500 line-through">
                ${product?.rowprice}
              </p>

              <p className="text-xl font-bold">${product?.price}</p>

              <p className="text-sm bg-lightGreen text-white px-2 rounded-md py-1 uppercase">
                You saved{""} ${product?.rowprice - product?.price}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-base text-lightText flex items-center">
                {Array?.from({ length: 5 }, (_, index) => {
                  const filled = index + 1 <= Math.floor(product?.ratings);
                  const halfFilled =
                    index + 1 > Math.floor(product?.ratings) &&
                    index < Math.ceil(product?.ratings);

                  return (
                    <MdStar
                      key={index}
                      className={`${
                        filled
                          ? "text-[#fa8900]"
                          : halfFilled
                            ? "text-yellow-300"
                            : "text-lightText"
                      }`}
                    />
                  );
                })}
              </div>
              <p className="text-sm font-semibold text-accent/60 tracking-wide">
                (120 Customers Reviews)
              </p>
            </div>

            <p className="text-sm tracking-wide text-gray-600">
              {product?.description}
            </p>

            <AddToCartButton product={product} className="rounded-md py-3" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-4 pb-3">
        {bestSellers.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </Container>
  );
};
export default ProductPage;
