import styles from "../page.module.css";
import PostsList, { PostsListFallback } from "../../components/PostsList"
import { Suspense } from 'react'

export type Post = {
  id: number,
  created_at: string,
  gameplay_rating: number,
  story_rating: number,
  music_rating: number,
  replay_rating: number,
  user_id: string,
  user_display_name: string,
  user_role: string,
  post_image: string
}

export default function BlogPage() {
    return (
        <div className={styles.page}>
            <h1>User Posts</h1>
            <section className={styles.postsContainer}>
                <Suspense fallback={<PostsListFallback />}>
                    <PostsList />
                </Suspense>
            </section>
        </div>
    )
}