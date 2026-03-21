import styles from "../app/page.module.css";
import Image from 'next/image'
import Form from 'next/form'
import type { Post } from '@/app/blogs/page'
import { Game, getDailyGame } from '@/utils/daily-game'
import { getUser, deletePost } from '@/app/auth/actions'


type PostProps = {
    post: Post
}

export default async function Post({ post }: PostProps) {

    const user = await getUser()

    return (
        <div className={styles.post}>
            <div className={styles.postImgContainer}>
                <Image src={post.post_image} alt="placeholder-img" height={300} width={350} />
            </div>
            <div className={styles.postDetails}>
                <p>Gameplay: {post.gameplay_rating}</p>
                <p>Story: {post.story_rating}</p>
                <p>Music: {post.music_rating}</p>
                <p>Replayability: {post.replay_rating}</p>
            </div>
            <p>Written By: {post.user_display_name}</p>
            {/* ADD USER ROLE FIELD HERE */}
            {user ? user.id === post.user_id && <button>DELETE</button> : null}
            {/* THIS LOGIC IS WORKING, JUST NEED TO ADD FUNCTIONALITY TO THE BUTTON */}
        </div>
    )
}

        // <li key={post.id}>
        //     Written By: {post.user_display_name}
        //     - Gameplay: {post.gameplay_rating}/10
        //     - Story: {post.story_rating}/10
        //     - Music: {post.music_rating}/10
        //     - Replay: {post.replay_rating}/10
        // </li>