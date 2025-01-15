"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/Loading";
import { sleep } from "@/functions/sleep";

export default function AuthHandler({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log(session, status);

  useEffect(() => {
    const goToHome = async () => {
      await sleep(500);
      router.push("/home");
    };
    if (status === "authenticated") {
      goToHome();
      return;
    }
    if (status === "loading") {
      return;
    }
    signIn("auth0");
  }, [router, status]);

  if (status === "loading") {
    return <Loading />;
  }

  return <>{children}</>;
}
