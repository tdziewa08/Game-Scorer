import styles from "./page.module.css";
import GameOfDay from "@/components/dailyGame";
import Link from 'next/link'
import Image from 'next/image'

//NEED TO FIGURE OUT HOW TO RUN THE TOKEN FETCHER ONE TIME, USE THE TOKEN FOR THE GAME FETCHER, RE-FETCH A GAME AFTER 24 HOURS

async function getToken() {
  const response = await fetch(
    'https://id.twitch.tv/oauth2/token?client_id=tw9b38rfdf3f49bwth8vajvp7ugzta&client_secret=4ilxc13p52i3mmhgcfcf2d1o4v98w0&grant_type=client_credentials', {method: 'POST'}
  )
  const data = await response.json()
  console.log("token function")
  console.log(data)
  return data.access_token
}

const token = await getToken()
const game = await getGamesTest()

async function getGamesTest() {
  const response = await fetch(
  "https://api.igdb.com/v4/covers", //CHANGE TO 'games ENDPOINT TO GET ALL DATA NEEDED FOR GAME OF THE DAY CARD
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'tw9b38rfdf3f49bwth8vajvp7ugzta',
      'Authorization': `Bearer ${token}`,
    },
    body: "fields url;"
  });
  const data = await response.json();
  console.log('game cover code...')
  console.log(data[3].url)
  return data[9].url
}

export default async function Home() {

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.attract}>
          <h1>Gamer Ranker Shitter</h1>
          <span>Please Sign-Up to rank our game of the day...</span>
        </section>
        <GameOfDay />
          <Link href="/blogs">View Blogs</Link>
          {/* <img src={game} /> */}
          <Image src={`https:${game}`} alt="game" height={200} width={300}/>
      </main>
    </div>
  );
}