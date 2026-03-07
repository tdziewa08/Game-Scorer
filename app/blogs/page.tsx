import styles from "../page.module.css";
import Post from "../../components/post"

export default function BlogPage() {
    return (
        <>
            <h1>This is the Blog page...</h1>
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