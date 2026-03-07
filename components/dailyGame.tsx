import styles from "../app/page.module.css";
import Image from 'next/image'
import Link from 'next/link'

export default function DailyGame() {
    return (
          <section className={styles.dailyGameCard}>
            <div className={styles.gameImgContainer}>
                <Image src="/re.svg" alt="placeholder-img" height={300} width={400} />
            </div>
            <div className={styles.dailyGameDetails}>
                <h2>Resident Evil Requiem</h2>
                <span>2026</span>
                <span>Capcom</span>
                <span>Real good so far</span>
                <Link href="/new-blog" >Write Post</Link> {/* conditionally render this Link component */}
            </div>
        </section>
    )
}