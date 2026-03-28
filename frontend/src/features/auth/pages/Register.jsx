// import React,{useState} from 'react'
// import { useNavigate, Link } from 'react-router'
// import { useAuth } from '../hooks/useAuth'

// const Register = () => {

//     const navigate = useNavigate()
//     const [ username, setUsername ] = useState("")
//     const [ email, setEmail ] = useState("")
//     const [ password, setPassword ] = useState("")

//     const {loading,handleRegister} = useAuth()
    
//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         await handleRegister({username,email,password})
//         navigate("/")
//     }

//     if(loading){
//         return (<main><h1>Loading.......</h1></main>)
//     }

//     return (
//         <main>
//             <div className="form-container">
//                 <h1>Register</h1>

//                 <form onSubmit={handleSubmit}>

//                     <div className="input-group">
//                         <label htmlFor="username">Username</label>
//                         <input
//                             onChange={(e) => { setUsername(e.target.value) }}
//                             type="text" id="username" name='username' placeholder='Enter username' />
//                     </div>
//                     <div className="input-group">
//                         <label htmlFor="email">Email</label>
//                         <input
//                             onChange={(e) => { setEmail(e.target.value) }}
//                             type="email" id="email" name='email' placeholder='Enter email address' />
//                     </div>
//                     <div className="input-group">
//                         <label htmlFor="password">Password</label>
//                         <input
//                             onChange={(e) => { setPassword(e.target.value) }}
//                             type="password" id="password" name='password' placeholder='Enter password' />
//                     </div>

//                     <button className='button primary-button' >Register</button>

//                 </form>

//                 <p>Already have an account? <Link to={"/login"} >Login</Link> </p>
//             </div>
//         </main>
//     )
// }

// export default Register

import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import "../auth.form.scss"

const Register = () => {

    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { loading, handleRegister } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleRegister({ username, email, password })
        navigate("/")
    }

    if (loading) {
        return (<main><h1>Initializing Protocol...</h1></main>)
    }

    return (
        <main className="auth-page">
            <div className="form-container cyber-card">
                <p className="tagline">PREPARE SMARTER. CRACK YOUR NEXT <span> INTERVIEW.</span></p>
                <h1>Create Account</h1>
                <p className="subtitle">Create your account to get personalized interview questions and preparation plans.</p>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label>Username</label>
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            placeholder="xyz"
                        />
                    </div>

                    <div className="input-group">
                        <label>Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="xyz@gmail.com"
                        />
                    </div>

                    <div className="input-group">
                        <label>password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="••••••••"
                        />
                    </div>

                    <button className="cyber-btn">Start Preparation</button>

                </form>

                <p className="switch">
                    Existing user? <Link to="/login">Sign In</Link>
                </p>

            </div>
        </main>
    )
}

export default Register