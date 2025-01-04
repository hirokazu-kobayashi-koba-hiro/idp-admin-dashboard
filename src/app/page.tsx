'use client'

import { signIn, useSession } from "next-auth/react"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();
    const { data: session, status } = useSession();
    console.log(session, status)

    useEffect(() => {
        if (status === 'authenticated') {
            router.push("/home")
        } else {
            signIn("auth0")
        }

    }, [status])

    if (status === "loading") {
        return <div>loading</div>
    }

    return (
        <>

        </>
    )
}
