import styles from "./page.module.css";
import GameOfDay from "@/components/dailyGame";
import Link from 'next/link'
import { Game, getDailyGame } from '@/utils/daily-game'


//CHECK HOW TO KEEP THE TOKEN ONLY EXECUTING EVERY 57 DAYS...4915617 seconds
// Revalidate this page every 24 hours (86400 seconds)
//export const revalidate = 86400;

// Force static generation (override dynamic behavior)
// export const dynamic = 'force-static';

export default async function Home() {

  const game: Game = await getDailyGame()

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.attract}>
          <h1>Gamer Ranker Shitter</h1>
          <span>Please Sign-Up to rank our game of the day...</span>
        </section>
        <GameOfDay game={game} />
        <Link href="/blogs">View Blogs</Link>
      </main>
    </div>
  );
}
