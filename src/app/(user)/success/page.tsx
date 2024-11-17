import SuccessContainer from "@/components/SuccessContainer";
import { redirect } from "next/navigation";

interface SuccessPageProps {
  searchParams: {
    session_id: string | null;
  };
}

const SuccessPage = async ({ searchParams }: SuccessPageProps) => {
  const id = await searchParams?.session_id;

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
