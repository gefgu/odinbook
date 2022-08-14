import { getProviders, signIn } from "next-auth/react";
import HeadData from "../../components/HeadData";
import styles from "../../styles/signin.module.css";

export default function SignIn({ providers }) {
  console.log(providers);

  const facebook = providers.facebook;

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

          {facebook && (
            <div>
              <button
                className={styles.button}
                onClick={() => signIn(facebook.id)}
              >
                Sign in with Facebook
              </button>
            </div>
          )}
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
