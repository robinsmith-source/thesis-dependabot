import React from "react";
import { getServerAuthSession } from "~/server/auth";
import Link from "next/link";

export default async function LoginBar() {
  const session = await getServerAuthSession();

  if (!session) {
    return <Link href={"/api/auth/signin"}>Log in</Link>;
  }

  return (
    <Link href={`/user/${session.user.id}`} className="flex items-center gap-2">
      <h1>Hi, {session.user.name}</h1>

      <img
        className="rounded-full"
        src={session.user.image ?? "https://placekitten.com/200/200"}
        alt={`profile of ${session.user.name}`}
        width={32}
        height={32}
      />
    </Link>
  );
}
