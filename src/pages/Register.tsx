// import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'


const Register = (props: LoadingInterface) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const setLoading = props.value.setLoading
  const navigate = useNavigate()
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (username && password && password2 && password == password2) {
      const registerCred = {
        username,
        password
      }
      axios
        .post(`https://mapex-backend.onrender.com/register`, registerCred, { withCredentials: true })
            .then(() => {
              setLoading(false)
              navigate("/login")
            })
            .catch((err) => {
              console.log(err)
              setLoading(false)
            })
    } else if (username && password && password2) {
      alert("Password fields are not matching!")
    } else {
      alert("Fields incomplete!")
    }
  }
  return (
  <div className='background register-page'>
    <form className="d-flex flex-column align-items-center shadow position-absolute top-50 start-50 translate-middle pt-5 px-4 bg-white" onSubmit={handleRegister}>
      <div className='d-flex'>
        <label className='me-2'>Username:</label>
        <input autoFocus onChange={(e) => setUsername(e.target.value)} type="text" />
      </div>
      <div className='d-flex my-4'>
        <label className='me-2'>Password:</label>
        <input onChange={(e) => setPassword(e.target.value)} type="password"/>
      </div>
      <div className='d-flex mb-3'>
        <label className='me-2'>Password (again):</label>
        <div><input onChange={(e) => setPassword2(e.target.value)} type="password"/></div>
      </div>
      <button className='btn btn-primary mb-3' type='submit'>Register</button>
      <p>Already signed up? <Link to="/login">Log in!</Link></p>
    </form>
  </div>
  )
}

export default Register