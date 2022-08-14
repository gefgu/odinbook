import { getProviders, signIn } from "next-auth/react";
import HeadData from "../../components/HeadData";
import styles from "../../styles/signin.module.css";

export default function SignIn({ providers }) {
  const facebook = providers.facebook;
  const credentials = providers.credentials;

  const handleCredentialsForm = (event) => {
    event.preventDefault();

    const data = {
      name: event.target.name.value,
      email: event.target.email.value,
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
              <label>
                Name
                <input name="name" type="text" placeholder="Your Name" />
              </label>
              <label>
                Email
                <input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  required
                />
              </label>
              <button className={styles.button}>Login</button>
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
