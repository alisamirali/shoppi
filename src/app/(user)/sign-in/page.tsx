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
    <Container className="py-8 flex flex-col justify-center items-center gap-6">
      <div className="flex flex-col gap-1 items-center justify-center">
        <h3 className="text-2xl md:text-3xl font-semibold">Welcome back!</h3>
        <p className="text-sm text-gray-500">Sign in to your account</p>
      </div>
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
