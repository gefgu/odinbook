import { getProviders, signIn } from "next-auth/react";
import HeadData from "../../components/HeadData";

export default function SignIn({ providers }) {
  return (
    <>
      <HeadData />
      <main>
        <h1>Odinbook</h1>
        <h2>Connect with friends and the world around you on Odinbook</h2>
        <div>
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button onClick={() => signIn(provider.id)}>
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();

  return {
    props: { providers },
  };
}
