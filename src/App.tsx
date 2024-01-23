import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import Header from './components/Header'
import Home from './pages/Home'
import Footer from './components/Footer'
import Explore from './pages/Explore'
import MyMaps from './pages/MyMaps'
import Blog from './pages/Blog'
import Login from './pages/Login'
import Register from './pages/Register'
import ExploreMap from './pages/ExploreMap'


function App() {
  const [loading, setLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState(null)
  return (
    <>
      <Header value={{setLoading, isLoggedIn, setIsLoggedIn}}/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/explore' element={<Explore value={{loading, setLoading}}/>}></Route>
        <Route path='/mymaps' element={<MyMaps value={{username, isLoggedIn, loading, setLoading}}/>}></Route>
        <Route path='/blog' element={<Blog/>}></Route>
        <Route path='/login' element={<Login value={{isLoggedIn, setIsLoggedIn, loading, setLoading, setUsername}} />}></Route>
        <Route path='/register' element={<Register value={{loading, setLoading}}/>}></Route>
        <Route path='/explore/:id' element={<ExploreMap/>}></Route>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
