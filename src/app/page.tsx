import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="bg-black">
      <p className="text-2xl text-gray-400 mt-20 text-center">
        Checkout the blog page☕😄
      </p>
    </div>
  );
}
