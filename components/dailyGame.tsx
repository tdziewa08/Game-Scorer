import styles from "../app/page.module.css";
import Image from 'next/image'
import Link from 'next/link'
import type { Game } from "@/utils/daily-game"
import { getUser } from '@/app/auth/actions'

type DailyGameProps = {
    game: Game
}

export default async function DailyGame({ game }: DailyGameProps) {

    const user = await getUser()
    const releaseDate = new Date(game.first_release_date * 1000)
    const cleanDate = releaseDate.toLocaleDateString('en-US', {year: 'numeric', month:'long', day:'numeric'})
    const testGenres = game.genres.join(", ")

    // const genres = game.genres.map((item, index) => {
    //     return <span key={index}>{item}</span>
    // })

    return (
          <section className={styles.dailyGameCard}>
            <div className={styles.gameImgContainer}>
                <Image src={game.image} alt="placeholder-img" height={350} width={400} />
            </div>
            <div className={styles.dailyGameDetails}>
                <h2>{game.name}</h2>
                <div>
                    <span>{cleanDate}</span>
                    <span>{game.company}</span>
                    <div className={styles.genresContainer}>
                        {testGenres}
                    </div>
                </div>
                <p className={styles.dailyGameSummary}>{game.summary}</p>
                {user && <Link href="/new-blog" >Write Post</Link>}
            </div>
        </section>
    )
}