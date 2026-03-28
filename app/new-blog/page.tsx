import styles from '@/app/page.module.css'
import { writePost } from '@/app/auth/actions'
import Form from 'next/form'
import Image from 'next/image'
import { Game, getDailyGame } from '@/utils/daily-game'
import { Suspense } from 'react'


export default function NewBlogPage() {
    return (
        <div className={styles.page}>
            <Suspense fallback={<NewBlogFallback />}>
                <NewBlogContent />
            </Suspense>
        </div>
    )
}

async function NewBlogContent() {
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

function NewBlogFallback() {
    return (
        <div style={{height: 200, width: 200, backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            Loading game image...
        </div>
    )
}