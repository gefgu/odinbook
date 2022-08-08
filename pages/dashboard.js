import HeadData from "../components/HeadData";
import NavBar from "../components/NavBar";
import styles from "../styles/dashboard.module.css";
import NewPostBox from "../components/NewPostBox";

export default function Dashboard() {
  return (
    <>
      <HeadData />
      <NavBar />
      <div className={styles.container}>
        <NewPostBox />
      </div>
    </>
  );
}
