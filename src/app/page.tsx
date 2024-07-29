"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const session = useSession();

  return (
    <div>
      <div>{JSON.stringify(session.data)}</div>

      <button
        onClick={() => {
          signIn();
        }}
      >
        Signin
      </button>
      <button
        onClick={() => {
          signOut();
        }}
      >
        SignOut
      </button>
    </div>
  );
}
