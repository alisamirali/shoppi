import Link from "next/link";
import { ProductData } from "../../types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { MdStar } from "react-icons/md";
import AddToCartButton from "@/components/AddToCartButton";

const ProductCard = ({ product }: { product: ProductData }) => {
  return (
    <div className="border border-px border-lightText/40 rounded-md relative group overflow-hidden">
      <div className="overflow-hidden">
        <Link href={`/product/${product?.slug.current}`}>
          <Image
            src={urlFor(product?.image).url()}
            alt={product?._type}
            width={500}
            height={500}
            priority
            className="w-full h-72 object-cover group-hover:scale-105 hoverEffect"
          />
        </Link>
      </div>

      <div className="px-6 py-4 flex flex-col items-center gap-2">
        <div className="text-base text-lightText flex items-center">
          {Array.from({ length: 5 }).map((_, index) => {
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

        <p className="text-lightOrange uppercase text-xs font-medium">
          {product?.brand}
        </p>
        <h2 className="text-base font-semibold text-accent line-clamp-1">
          {product?.title}
        </h2>
        <p className="text-center line-clamp-2 text-sm">
          {product?.description}
        </p>

        <div className="flex items-center gap-3 mb-2">
          <p className="text-lightText line-through">${product?.rowprice}</p>
          <p className="text-darkOrange font-bold">${product?.price}</p>
        </div>
      </div>

      <AddToCartButton product={product} />
    </div>
  );
};
export default ProductCard;
