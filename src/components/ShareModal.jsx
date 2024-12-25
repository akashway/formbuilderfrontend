import React, { useState } from 'react'
import styles from './shareModal.module.css'
import shareAccessService from '../services/shareAccessService'
const ShareModal = () => {
    const [email, setEmail] = useState("")
    const [accessType, setAccessType] = useState("edit")

    const submitHandler =async (e) => {
        e.preventDefault()
        const sharedData={
            email,
            accessType
        }
        const response=await shareAccessService(sharedData)
        console.log(response)
    }
    return (
        <div className={styles.shareContainer}>
            <form onSubmit={submitHandler}>
                <div>
                    <select id="access" value={accessType} onChange={(e) => setAccessType(e.target.value)}>
                        <option value="edit">edit</option>
                        <option value="view">view</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="email">Invite by Email</label>
                    <br /><br />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter email id"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <button>Send Invite</button>
                <h1>Invite by link</h1>
                <button>Copy link</button>

            </form>
        </div>
    )
}

export default ShareModal
