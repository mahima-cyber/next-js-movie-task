import MoviesList from "@/component/movies-list";
import styles from "../app/page.module.css";

export default function Home({ children }) {
  return (
    <main className={styles.main}>
      <MoviesList />
    </main>
  );
}
