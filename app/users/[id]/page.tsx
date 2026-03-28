import styles from '@/app/page.module.css'
import { Suspense } from 'react'
import { createClient } from '@/utils/supabase/server'
import { getUser } from '@/app/auth/actions'
import Post from "@/components/post"
//import type Post from '@/app/blogs/page'


type Props = {
    params: Promise<{ id: string }>
}

async function getUserPosts(userId: string) {
    const user = await getUser()
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('test_post_table')
        .select('*')
        .eq('user_id', userId)

    if (error) {
        console.error('Error fetching user posts:', error)
        return null
    }

    return data?.map(post => (
        <Post key={post.id} post={post} user={user} />
    ))
}

async function getUserData(userId: string) {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

    if (error) {
        console.error('Error fetching user profile:', error)
        return null
    }

    return data
}

function UserDetailFallback() {
    return ( 
        <div>LOADING...</div>
    )
}

export default async function UserDetail({ params }: Props) {

    const { id } = await params
    const [userPosts, userData] = await Promise.all([
        getUserPosts(id),
        getUserData(id)
    ])

    const memberSince = userData?.created_at
        ? new Date(userData.created_at).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })
        : 'Unknown'

    return (
        <Suspense fallback={<UserDetailFallback />}>
            <h1>USER: {userData?.display_name}</h1>
            <h2>ROLE: {userData?.app_role}</h2>
            <h3>MEMBER SINCE: {memberSince}</h3>
            {userPosts}
        </Suspense>
    )
}


// const { data, error } = await supabase
//         .from('test_post_table')
//         .insert(
//             {
//                 user_id: user.id,
//                 user_display_name: user.user_metadata.display_name,
//                 user_role: user.user_metadata.app_role,
//                 gameplay_rating: Number(formData.get('gameplay')),
//                 story_rating: Number(formData.get('story')),
//                 music_rating: Number(formData.get('music')),
//                 replay_rating: Number(formData.get('replay')),
//                 post_image: formData.get('post_image') as string
//             }
//         )