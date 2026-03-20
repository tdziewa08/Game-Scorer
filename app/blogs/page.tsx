import styles from "../page.module.css";
import Post from "../../components/post"
import { createClient } from '@/utils/supabase/server'

export default async function BlogPage() {
    const supabase = await createClient()

    const { data: test_post_table, error } = await supabase.from('test_post_table').select()
    
    if (error) {
        console.error('Error fetching posts:', error)
        return <div>Error loading posts</div>
    }

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