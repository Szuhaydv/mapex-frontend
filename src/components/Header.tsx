import { Link } from "react-router-dom"
import { useRef } from "react"
import axios from "axios"

const Header = (props: any) => {
  const isLoggedIn = props.value.isLoggedIn
  const setIsLoggedIn = props.value.setIsLoggedIn
  const setLoading = props.value.setLoading
  const logoutArea = useRef<any>(null)
  const body: any = document.querySelector('body')
  body.onclick = (e: any) => {
    if (e.target.classList[0] === 'profile-img') {
      return
    } else {
      if (logoutArea.current) {
        showLogout('hide')        
      }
      return
    }
  }
  const showLogout = (show: any) => {
    if (show === 'hide') {
      if(logoutArea.current.style.opacity === '1') {
        logoutArea.current.style.opacity = '0'
      }
    } else {
      logoutArea.current.style.opacity === '0' ?
        logoutArea.current.style.opacity = '1' :
        logoutArea.current.style.opacity = '0'
    }
  }
  const handleLogout = () => {
    setIsLoggedIn(false)
    setLoading(true)
    axios
      .get('http://localhost:5656/logout', { withCredentials: true })
        .then(() => {
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)
        })
  }
  return (
    <header className="w-100 d-flex">
      <div className="h-100 logo d-flex gap-4 align-items-center">
        <Link to='/'>
          <img className="logo-img" src="https://cdn-icons-png.flaticon.com/128/3192/3192970.png" alt="Logo image" />
        </Link>
        <Link to='/'>
          <h2>Mapex</h2>
        </Link>
      </div>
      <nav className="h-100 d-flex justify-content-between align-items-center">
        <Link to='/explore'>
          <h2>Explore</h2>
        </Link>
        <Link to='/blog'>
          <h2>Blog</h2>
        </Link>
        <Link to='/mymaps'>
          <h2>My Maps</h2>
        </Link>
        { isLoggedIn ? 
          <div className="profile-picture position-relative">
            <img className="profile-img" onClick={() => showLogout('none')} src="https://img.freepik.com/free-vector/businessman-working-laptop-computer-office-3d-character-isolated-white-background_40876-3756.jpg?w=1800&t=st=1704478938~exp=1704479538~hmac=07d104c95534b33d677f49f4ccb65d169f95ff1f1af3f6ea3dee419e85fa7665" alt="" />
            <div ref={logoutArea} style={{opacity: '0'}} className="test-box position-absolute d-flex align-items-center justify-content-center">
              <button onClick={() => handleLogout()} >Sign out</button>
            </div>            
          </div> :
          <Link to='/login'>
            <button className="sign-in btn btn-primary">Sign in</button>
          </Link>
        }
      </nav>
    </header>
  )
}

export default Header