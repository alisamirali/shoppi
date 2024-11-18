import SuccessContainer from "@/components/SuccessContainer";
import { redirect } from "next/navigation";

interface SuccessPageProps {
  searchParams: Promise<{
    session_id: string | null;
  }>;
}

const SuccessPage = async ({ searchParams }: SuccessPageProps) => {
  const resolvedParams = await searchParams;
  const id = resolvedParams?.session_id;

  if (!id) {
    redirect("/");
    return null;
  }

  return (
    <div>
      <SuccessContainer id={id} />
    </div>
  );
};

export default SuccessPage;
