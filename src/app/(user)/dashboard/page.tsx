import { auth, signOut } from "@/auth";
import Container from "@/components/Container";
import Image from "next/image";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <Container className="py-8 flex items-center justify-center flex-col gap-3">
      <h2 className="text-2xl font-semibold">Welcome to your Dashboard</h2>
      <div className="flex flex-col justify-center items-center gap-3 my-5">
        <Image
          src={session?.user?.image as string}
          alt={session?.user?.name as string}
          width={200}
          height={200}
          className="size-14 rounded-full"
        />
        <div className="text-center">
          <p className="text-xl font-semibold">{session?.user?.name}</p>
          <p className="text-lg">{session?.user?.email}</p>
        </div>
      </div>

      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <button
          type="submit"
          className="bg-gray-50 border border-gray-400 px-6 py-2 rounded-md text-lg font-semibold hover:bg-gray-800 hover:text-white hoverEffect"
        >
          Sign Out
        </button>
      </form>
    </Container>
  );
};
export default DashboardPage;
