// import React,{useState} from 'react'
// import { useNavigate, Link } from 'react-router'
// import "../auth.form.scss"
// import { useAuth } from '../hooks/useAuth'

// const Login = () => {

//     const { loading, handleLogin } = useAuth()
//     const navigate = useNavigate()

//     const [ email, setEmail ] = useState("")
//     const [ password, setPassword ] = useState("")

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         await handleLogin({email,password})
//         navigate('/')
//     }

//     if(loading){
//         return (<main><h1>Loading.......</h1></main>)
//     }


//     return (
//         <main>
//             <div className="form-container">
//                 <h1>Login</h1>
//                 <form onSubmit={handleSubmit}>
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
//                     <button className='button primary-button' >Login</button>
//                 </form>
//                 <p>Don't have an account? <Link to={"/register"} >Register</Link> </p>
//             </div>
//         </main>
//     )
// }

// export default Login

import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'

const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleLogin({ email, password })
        navigate('/')
    }

    if (loading) {
        return (<main><h1>loading...</h1></main>)
    }

    return (
        <main className="auth-page">
            <div className="form-container cyber-card">

                <h1>Login</h1>
                <p className="subtitle">Sign in to continue your interview preparation journey.</p>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label> Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="xyz@gmail.com"
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="••••••••"
                        />
                    </div>

                    <button className="cyber-btn">Start Preparing</button>

                </form>

                <p className="switch">
                    New here? <Link to="/register">Create an account</Link>
                </p>

            </div>
        </main>
    )
}

export default Login