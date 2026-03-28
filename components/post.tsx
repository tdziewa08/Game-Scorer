import styles from "../app/page.module.css";
import Image from 'next/image'
import Form from 'next/form'
import type { Post as PostType } from '@/app/blogs/page'
import type { User } from '@supabase/supabase-js'
import { deletePost } from '@/app/auth/actions'

type PostProps = {
    post: PostType
    user: User | null
}

export default function Post({ post, user }: PostProps) {
    const postTime = new Date(post.created_at).toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    })

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
            <p>Written By: {post.user_display_name} ({post.user_role})</p>
            <p>{postTime}</p>
            {user?.id === post.user_id &&
            <form action={deletePost.bind(null, post.id)}>
                <button type='submit'>DELETE</button>
            </form>}
        </div>
    )
}