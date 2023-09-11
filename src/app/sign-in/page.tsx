"use client";

import { signIn } from "next-auth/react";

export default function Page() {
  return (
    <div className="w-full min-h-screen bg-red-50 grid place-items-center">
      <div className="max-w-xs w-full border rounded-md border-zinc-200 shadow shadow-sm flex flex-col gap-4 p-6">
        <p className="text-2xl font-medium">Sign In</p>

        <button
          onClick={() => signIn("discord", { callbackUrl: "/dashboard" })}
          className="px-4 py-2 bg-violet-500 text-center"
        >
          Sign in with Discord
        </button>
      </div>
    </div>
  );
}
