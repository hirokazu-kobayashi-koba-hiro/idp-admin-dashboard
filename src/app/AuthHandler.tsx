"use client";

import { signIn, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loading } from "@/components/Loading";

export default function AuthHandler({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const goToPage = async () => {
    console.log(session);
    console.log("goToPage", pathname);
    if (!session?.tenantId) {
      console.log("!session?.tenantId");
      console.log(session);
      router.push("/onboarding");
      return;
    }
    if (session?.tenantId && pathname === "/onboarding") {
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
    const fn = async () => {
      if (status === "authenticated") {
        await goToPage();
        return;
      }
      if (status === "loading") {
        return;
      }
      if (pathname.startsWith("/initial")) {
        router.push(pathname);
        return;
      }
      await signIn("idp-server");
    }

    fn()
  }, [router, status]);

  if (status === "loading" || status === "unauthenticated") {
    return <Loading />; // Show a loading screen instead
  }

  return <>{children}</>;
}
