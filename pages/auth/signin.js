import Head from "next/head";
import { getProviders, signIn } from "next-auth/react";

export default function SignIn({ providers }) {
  return (
    <>
      <Head>
        <title>Odinbook</title>
        <meta name="description" content="Odinbook" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      ABC
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();

  return {
    props: { providers },
  };
}
