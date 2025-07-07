"use client";

import { signIn, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import {useRouter, usePathname, useSearchParams} from "next/navigation";
import { Loading } from "@/components/ui/Loading";

export default function AuthHandler({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
      if (pathname.startsWith("/invitation")) {
        const invitationId = searchParams.get("invitation_id") || "";
        const invitationTenantId = searchParams.get("invitation_tenant_id") || "";

        console.log("invitationId", invitationId);
        console.log("invitationTenantId", invitationTenantId);

        await signIn("idp-server", {
          "redirectTo": process.env.NEXT_PUBLIC_IDP_ADMIN_DASHBOARD_INVITATION_CALLBACK
        }, {
          "invitation_id": invitationId,
          "invitation_tenant_id": invitationTenantId,
          "prompt": "create"
        });

        return;
      }
      await signIn("idp-server");
    };

    fn();
  }, [router, status, pathname, searchParams, goToPage]);

  if (
    status === "loading" ||
    (status === "unauthenticated" && !pathname.startsWith("/initial"))
  ) {
    return <Loading />; // Show a loading screen instead
  }

  return <>{children}</>;
}
