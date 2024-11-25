import { FaClockRotateLeft, FaWallet } from "react-icons/fa6";
import { GoRocket } from "react-icons/go";
import { PiChats } from "react-icons/pi";

const facilitiesData = [
  {
    title: "Free Delivery",
    description: "When ordering above $500",
    icon: <GoRocket />,
  },
  {
    title: "90 Days Return",
    description: "If goods have problems",
    icon: <FaClockRotateLeft />,
  },
  {
    title: "Secure Payment",
    description: "100% secure payment",
    icon: <FaWallet />,
  },
  {
    title: "24/7 Support",
    description: "Dedicated support",
    icon: <PiChats />,
  },
];

const Facilities = () => {
  return (
    <section className="py-10 flex items-center justify-between flex-col md:flex-row flex-wrap gap-5 md:px-4 px-2">
      {facilitiesData.map((facility) => (
        <div
          key={facility?.title}
          className="flex flex-col sm:flex-row gap-3 items-center"
        >
          <span className="text-3xl text-lightOrange">{facility?.icon}</span>
          <div className="text-center sm:text-left">
            <h2 className="uppercase font-bold mb-1">{facility?.title}</h2>
            <p className="text-sm text-lightText">{facility?.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
};
export default Facilities;
