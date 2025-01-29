"use client";

import { signIn, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Loading } from "@/components/Loading";
import { sleep } from "@/functions/sleep";

export default function AuthHandler({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  console.log("AuthHandler", session, status, searchParams);

  useEffect(() => {
    const goToPage = async () => {
      await sleep(500);
      if (pathname && pathname !== "/") {
        router.push(pathname);
        return;
      }
      router.push("/home");
    };
    if (status === "authenticated") {
      goToPage();
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
