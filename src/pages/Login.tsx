import axios from 'axios'
import { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'


const Login = (props: LoginProps) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const setLoading = props.value.setLoading
  const setIsLoggedIn = props.value.setIsLoggedIn
  const setUser = props.value.setUsername

  const errMessageRef = useRef<HTMLDivElement>(null)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username && password) {
      const loginCred = {
        username,
        password
      }
      axios
        .post(`https://mapex-backend.onrender.com/login`, loginCred, {withCredentials: true })
            .then(() => {
              setLoading(false)
              setUser(username)
              setIsLoggedIn(true)
              navigate("/")
            })
            .catch(() => {
              if (errMessageRef.current) {
                errMessageRef.current.style.animation = 'disappear 2s forwards'
                setLoading(false)
              }
            })
    } else {
      alert("Username or password field incomplete!")
    }
  }
  const handleAnimationEnd = () => {
    if (errMessageRef.current) {
      errMessageRef.current.style.animation = 'none'
    }
  }
  return (
  <div className='login-page position-relative'>
    <form onSubmit={handleLogin} className="d-flex flex-column align-items-center shadow position-absolute top-50 start-50 translate-middle pt-5 px-4 bg-white">
      <div className='d-flex'>
        <label className='me-2'>Username:</label>
        <input autoFocus onChange={(e) => setUsername(e.target.value)} type="text" />
      </div>
      <div className='d-flex my-4'>
        <label className='me-2'>Password:</label>
        <input onChange={(e) => setPassword(e.target.value)} type="password"/>
      </div>
      <button type='submit' className='btn btn-primary mb-3'>Log in</button>
      <p>Haven't registered yet? <Link to="/register">Register!</Link></p>
    </form>
    <div ref={errMessageRef} onAnimationEnd={handleAnimationEnd} className="error-message position-absolute start-50">
      <p>
        Username or password incorrect!
      </p>
    </div>
  </div>
  )
}

export default Login