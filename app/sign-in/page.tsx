import styles from '@/app/page.module.css'
import Form from 'next/form'
import { handleSignin } from '@/app/auth/actions'

export default function SignUpPage() {
    return (
        <div className={styles.page}>
            <Form action={handleSignin} className={styles.signupPage}>
                <h1>Sign In</h1>
                <label>
                    <div>
                        <p>Email Address</p>
                        <input type='email' name='email' placeholder='me@abc.com' required />
                    </div>
                </label>
                <label>
                    <div>
                        <p>Password</p>
                        <input type='password' name='password' placeholder='Enter password' required />
                    </div>
                </label>
                <button type='submit'>Sign In</button>
            </Form>
        </div>
    )
}