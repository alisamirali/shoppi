import Button from "@/components/Button";
import Container from "@/components/Container";
import { getBannersData } from "@/lib/getData";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { BannerData } from "../../types";
import Link from "next/link";

const Banner = async () => {
  const banners = await getBannersData();
  const singleBanner = banners[0];

  //   absolute left-10 top-0
  return (
    <Container className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10 md:max-h-[600px]">
      {/* Left Single Banner */}
      <div className="md:col-span-2 bg-bgLight relative flex items-start md:items-center justify-between flex-col md:flex-row p-6 rounded-lg overflow-hidden group">
        <div className="flex flex-col justify-center gap-5 md:gap-10">
          <div className="flex flex-col gap-1 md:gap-3">
            <button className="bg-lightGreen text-white rounded-full w-20 py-1 text-sm font-semibold hover:bg-green-600 hoverEffect">
              Sale {singleBanner?.price}
            </button>

            <p className="text-xl md:text-3xl font-semibold">
              {singleBanner?.title}
            </p>
            <h2 className="text-2xl md:text-6xl font-bold">
              {singleBanner?.subtitle}
            </h2>
            <p className="text-xs md:text-sm text-black/60 font-medium w-full md:max-w-44">
              {singleBanner?.description}
            </p>
          </div>

          <Button className="w-40 py-2.5 text-sm">Shop Now</Button>
        </div>
        <Image
          src={urlFor(singleBanner?.image).url()}
          alt={singleBanner?.title}
          width={500}
          height={500}
          priority
          className="object-cover h-[260px] w-full md:max-h-[400px] self-center group-hover:scale-105 hoverEffect"
        />
      </div>

      {/* Right Double Banner */}
      <div className="flex flex-col space-y-5 md:space-y-10 h-auto md:max-h-[600px]">
        {banners.slice(1, 3).map((banner: BannerData) => (
          <div
            key={banner?._id}
            className="h-full md:h-1/2 bg-bgLight rounded-lg overflow-hidden flex justify-center items-center p-5 group"
          >
            <div className="w-1/2 flex flex-col">
              <div>
                <p className="text-2xl font-semibold">{banner?.title}</p>
                <p className="text-3xl font-bold">{banner?.subtitle}</p>
              </div>

              <p className="mt-3 font-medium text-black/60">
                From{" "}
                <span className="text-lightRed font-bold">
                  ${banner?.price}
                </span>
              </p>
              <Link
                href="/shop"
                className="mt-5 font-bold underline underline-offset-2 decoration-[1px] hover:text-lightRed hoverEffect"
              >
                Shop Now
              </Link>
            </div>

            <Image
              src={urlFor(banner?.image).url()}
              alt={banner?.title}
              width={500}
              height={500}
              priority
              className="object-contain h-72 md:h-60 w-1/2 group-hover:scale-105 hoverEffect"
            />
          </div>
        ))}
      </div>
    </Container>
  );
};
export default Banner;
