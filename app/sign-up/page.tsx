import styles from '@/app/page.module.css'
import Form from 'next/form'

export default function SignUpPage() {
    return (
        <div className={styles.page}>
            <form className={styles.signupPage}>
                <h1>Sign Up</h1>
                <label>
                    <div>
                        <p>Email Address</p>
                        <input type='text' placeholder='me@abc.com'/>
                    </div>
                </label>
                <label>
                    <div>
                        <p>Password</p>
                        <input type='text' placeholder='123'/>
                    </div>
                </label>
                <button>Sign Up</button>
            </form>
        </div>
    )
}