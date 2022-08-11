import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Odinbook</title>
        <meta name="description" content="Odinbook" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {session ? (
        <>
          <h1>Signed in as {session.user.name}</h1>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          <h1>Not signed in </h1>
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
    </>
  );
}
