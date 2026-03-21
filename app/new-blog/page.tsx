import styles from '@/app/page.module.css'
import { writePost } from '@/app/auth/actions'
import Form from 'next/form'
import Image from 'next/image'
import { Game, getDailyGame } from '@/utils/daily-game'


export default async function NewBlogPage() {

    const { image } = await getDailyGame()

    return (
        <div className={styles.page}>
            <Image src={image} alt="the game" height={200} width={200} />
            <Form action={writePost} className={styles.signupPage}>
                <h1>New Blog</h1>
                <label>
                    <div>
                        <p>Gameplay</p>
                        <input type='number' name='gameplay' placeholder='Enter score' required />
                    </div>
                </label>
                <label>
                    <div>
                        <p>Story</p>
                        <input type='number' name='story' placeholder='Enter score' required />
                    </div>
                </label>
                <label>
                    <div>
                        <p>Music</p>
                        <input type='number' name='music' placeholder='Enter score' required />
                    </div>
                </label>
                <label>
                    <div>
                        <p>Replay</p>
                        <input type='number' name='replay' placeholder='Enter score' required />
                    </div>
                </label>
                <input type="hidden" name="post_image" value={image} />
                <button type="submit">Post</button>
            </Form>
        </div>
    )
}