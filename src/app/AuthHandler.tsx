"use client";

import { signIn, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loading } from "@/components/Loading";
import { sleep } from "@/functions/sleep";

export default function AuthHandler({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const goToPage = async () => {
    console.log(session)
    console.log("goToPage", pathname);
    if (!session?.tenantId) {
      console.log("!session?.tenantId");
      console.log(session);
      router.push("/initial/onboarding");
      return;
    }
    if (session?.tenantId && pathname === "/initial/onboarding") {
      router.push("/activity");
      return;
    }
    if (pathname && pathname !== "/") {
      router.push(pathname);
      return;
    }
    router.push("/activity");
  };

  useEffect(() => {
    if (status === "authenticated") {
      goToPage();
      return;
    }
    if (status === "loading") {
      return;
    }
    if (pathname.startsWith("/initial")) {
      router.push(pathname);
      return;
    }
    signIn("idp-server");
  }, [router, status]);

  if (status === "loading") {
    return <Loading />;
  }

  return <>{children}</>;
}
