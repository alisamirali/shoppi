import { auth, signIn } from "@/auth";
import Container from "@/components/Container";
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const SignInPage = async () => {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return (
    <Container className="py-8 flex flex-col justify-center items-center">
      <form
        action={async () => {
          "use server";

          await signIn("google", { redirectTo: "/" });
        }}
        className="flex items-center gap-1 border border-blue-500 font-semibold bg-blue-50 px-4 py-1.5 rounded-md hover:bg-blue-800 hover:text-white hoverEffect"
      >
        <FcGoogle className="text-2xl" />
        <button>Sign in with Google</button>
      </form>
    </Container>
  );
};
export default SignInPage;
