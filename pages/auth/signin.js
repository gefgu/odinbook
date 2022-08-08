import { getProviders, signIn } from "next-auth/react";
import HeadData from "../../components/HeadData";
import styles from "../../styles/signin.module.css";

export default function SignIn({ providers }) {
  return (
    <>
      <HeadData />
      <main className={styles.container}>
        <div className={styles.text}>
          <h1 className={styles.title}>Odinbook</h1>
          <h2 className={styles.cta}>
            Connect with friends and the world around you on Odinbook
          </h2>
        </div>
        <div className={styles.box}>
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className={styles.button}
                onClick={() => signIn(provider.id)}
              >
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
