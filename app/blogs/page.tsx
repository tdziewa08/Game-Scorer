import styles from "../page.module.css";
import Post from "../../components/post"
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function BlogPage() {

    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data: test_post_table } = await supabase.from('test_post_table').select()

    return (
        <>
            <h1>This is the Blog page...</h1>
            <ul>
                {test_post_table?.map((post) => (
                <li key={post.id}>
                    ID: {post.id} - Gameplay: {post.gameplay_rating}/10
                    ID: {post.id} - Story: {post.story_rating}/10
                    ID: {post.id} - Music: {post.music_rating}/10
                    ID: {post.id} - Replay: {post.replay_rating}/10
                </li>
                ))}
            </ul>
            <section className={styles.postsContainer}>
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </section>
        </>
    )
}