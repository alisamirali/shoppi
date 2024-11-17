import SuccessContainer from "@/components/SuccessContainer";
import { redirect } from "next/navigation";

interface SuccessPageProps {
  searchParams: {
    session_id: string | null;
  };
}

const SuccessPage = ({ searchParams }: SuccessPageProps) => {
  const id = searchParams?.session_id;

  if (!id) {
    redirect("/");
  }

  return (
    <div>
      <SuccessContainer id={id} />
    </div>
  );
};
export default SuccessPage;
