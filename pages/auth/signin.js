import { getProviders, signIn } from "next-auth/react";
import HeadData from "../../components/HeadData";

export default function SignIn({ providers }) {
  return (
    <>
      <HeadData />
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
