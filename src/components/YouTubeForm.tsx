import React from 'react'

export const YouTubeForm = () => {
  return (
    <div>
        <form action="">
            <label htmlFor="username">Username</label>
            <input type="text" id='username' name='username' />

            <label htmlFor="email">Email</label>
            <input type="email" id='email' name='email' />

            <label htmlFor="channel">Channel</label>
            <input type="text" id='channel' name='channel' />

            <button>Submit</button>
        </form>
    </div>
  )
}
