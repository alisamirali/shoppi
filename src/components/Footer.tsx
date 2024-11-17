import Container from "@/components/Container";
import { footerData } from "@/constants";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-bgLight py-10">
      <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {footerData?.map((item) => (
          <div key={item?._id}>
            <h3 className="text-darkOrange/90 text-lg font-semibold mb-3">
              {item?.title}
            </h3>

            <div className="flex flex-col gap-1">
              {item?.listItem?.listData?.map((list) => (
                <Link
                  href=""
                  key={list}
                  className="w-fit py-1 text-accent font-medium hover:text-darkOrange hoverEffect"
                >
                  {list}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </Container>
    </footer>
  );
};
export default Footer;
