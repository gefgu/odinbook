import { getProviders, signIn, useSession } from "next-auth/react";
import { Router, useRouter } from "next/router";
import HeadData from "../../components/HeadData";
import styles from "../../styles/signin.module.css";

export default function SignIn({ providers }) {
  const { status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    router.replace("/dashboard")
  }

  const facebook = providers.facebook;
  const credentials = providers.credentials;

  const handleCredentialsForm = (event) => {
    event.preventDefault();

    const data = {
      name: "Example User",
      email: "example@example.com",
    };

    signIn("credentials", data);
  };

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
          {credentials && (
            <form className={styles.credsForm} onSubmit={handleCredentialsForm}>
              <button className={styles.button}>Guest Sign-in</button>
            </form>
          )}
          <hr />
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
