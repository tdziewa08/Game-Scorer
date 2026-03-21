import styles from "../page.module.css";
import Post from "../../components/post"
import { createClient } from '@/utils/supabase/server'

export type Post = {
  id: number,
  created_at: string,
  gameplay_rating: number,
  story_rating: number,
  music_rating: number,
  replay_rating: number,
  user_id: string,
  user_display_name: string,
  post_image: string
}

export default async function BlogPage() {
    const supabase = await createClient()
    const { data: test_post_table, error } = await supabase.from('test_post_table').select()
    
    if (error) {
        console.error('Error fetching posts:', error)
        return <div>Error loading posts</div>
    }

    const postData = test_post_table?.map(post => <Post key={post.id} post={post} />)

    return (
        <>
            <h1>This is the Blog page...</h1>
            <section className={styles.postsContainer}>
                {postData}
            </section>
        </>
    )
}